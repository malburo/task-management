import React, { ReactElement, useEffect, useState } from 'react';
import MessageStyle from './MessageStyle';
import _ from 'lodash';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Box } from '@mui/system';
import { Avatar, Button, Input, Tooltip, Typography } from '@mui/material';
import ImageLoading from '../Loader/ImageLoading';
import ImageFailed from '../Loader/ImageFailed';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { IUser } from 'models/user';
import ISelectFormMessage from 'models/selectMessage';
import messageApi from 'api/messageApi';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import LinkPreviewSkeleteon from '../skeleton/LinkPreviewSkeletion';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AccountPreview from '../AccountPreview';

interface IMessagePros {
  postedDate: Date;
  content: string;
  renderTimeLine: Boolean;
  time: Date;
  type: Number;
  owner: IUser;
  form?: ISelectFormMessage;
  setImageView: (value: boolean) => void;
  setImageSrc: (value: string) => void;
}

const Message: React.FC<IMessagePros> = (props) => {
  const { form, content, renderTimeLine, type, setImageView, setImageSrc } = props;
  const style = MessageStyle();
  const [timeline, setTimeline] = useState<ReactElement>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const [url, setUrl] = useState<string>();
  let sortedData = [...(form?.options ?? [])].sort((a, b) => (b.userId?.length ?? 0) - (a.userId?.length ?? 0));

  const [openTooltip, setOpenTooltip] = React.useState(false);

  const chooseOption = (e: React.FormEvent<HTMLButtonElement>) => {
    messageApi.chooseOption(room._id, e.currentTarget.value);
  };

  useEffect(() => {
    // eslint-disable-next-line
    const urlRegex = /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/m;
    const data = content.match(urlRegex);
    if (data) setUrl(data[0]);
    else setUrl(undefined);
  }, [content]);

  useEffect(() => {
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(props.time)} />);
    // eslint-disable-next-line
  }, [renderTimeLine]);

  const addToOptions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.length > 0 && form) {
      messageApi.addOption({ roomId: room._id, text: e.currentTarget.value, formId: form._id });
      e.currentTarget.value = '';
    }
  };

  return (
    <React.Fragment>
      {timeline}
      <Box className={style.message}>
        <Box className={style.avatar}>
          <Tooltip arrow placement="top" open={openTooltip} title={<AccountPreview value={props.owner} />}>
            <Avatar
              onMouseEnter={() => setOpenTooltip(true)}
              onMouseLeave={() => setOpenTooltip(false)}
              className={style.avatarImg}
              alt="none"
              src={props.owner.profilePictureUrl}
            />
          </Tooltip>
        </Box>
        <Box>
          <Box flex="true">
            {type === 3 && (
              <Box className={style.messageContent}>
                <AlignVerticalBottomIcon sx={{ float: 'right' }} />
                <Typography variant="body2" sx={{ minWidth: '200px', marginBottom: '10px' }}>
                  {content}
                </Typography>
                {sortedData.map((item) => {
                  if (item.userId?.filter((i) => _.isEqual(i, me._id)).length > 0)
                    return (
                      <Button
                        key={item._id}
                        value={item._id}
                        onClick={chooseOption}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={style.option}
                      >
                        <Typography className={style.optionValue}>{item.text}</Typography>
                        <Typography>{item.userId.length > 0 ? item.userId.length : ''}</Typography>
                      </Button>
                    );
                  else
                    return (
                      <Button
                        key={item._id}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        value={item._id}
                        onClick={chooseOption}
                        className={style.option}
                      >
                        <Typography className={style.optionValue}>{item.text}</Typography>
                        <Typography>{item.userId.length > 0 ? item.userId.length : ''}</Typography>
                      </Button>
                    );
                })}
                {form?.isAddNew && (
                  <Input
                    placeholder="type new item here"
                    fullWidth
                    sx={{ paddingLeft: '10px', fontSize: '0.75em', color: 'white' }}
                    onKeyDown={addToOptions}
                  />
                )}
              </Box>
            )}
            {type === 1 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  {content}
                </Typography>
              </Box>
            )}
            {type === 2 && (
              <Box className={`${style.messageContent} ${style.imageContent}`}>
                {isLoading && <ImageLoading />}
                {isError && <ImageFailed />}
                <img
                  style={isLoading || isError ? { height: '0' } : {}}
                  onLoad={() => {
                    setIsLoading(false);
                  }}
                  onError={() => {
                    setIsLoading(false);
                    setIsError(true);
                  }}
                  onClick={() => {
                    setImageView(true);
                    setImageSrc(content);
                  }}
                  src={content}
                  className={style.image}
                  alt=""
                />
              </Box>
            )}
          </Box>
          {url && type === 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LinkPreview url={url} className={style.linkPreview} customLoader={<LinkPreviewSkeleteon />} />
            </Box>
          )}
          <Box className={style.accountInfor}>
            <Typography sx={{ fontSize: '0.75em' }} variant="subtitle2">
              {dateUtil.fortmatDate(props.postedDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Message;
