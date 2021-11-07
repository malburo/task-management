import React, { ReactElement, useEffect, useState } from 'react';
import MessageStyle from './MessageStyle';
import _ from 'lodash';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Box } from '@mui/system';
import { Button, Input, Typography } from '@mui/material';
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

interface IMessagePros {
  name: string;
  postedDate: Date;
  content: string;
  profilePictureUrl: string;
  renderTimeLine: Boolean;
  time: Date;
  type: Number;
  form?: ISelectFormMessage;
}

const Message: React.FC<IMessagePros> = ({
  name,
  postedDate,
  content,
  profilePictureUrl,
  renderTimeLine,
  time,
  type,
  form,
}) => {
  const style = MessageStyle();
  const [timeline, setTimeline] = useState<ReactElement>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const [url, setUrl] = useState<string>();
  let sortedData = [...(form?.options ?? [])].sort((a, b) => (b.userId?.length ?? 0) - (a.userId?.length ?? 0));

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
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(time)} />);
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
      <div className={style.message}>
        <div className={style.avatar}>
          <img className={style.avatarImg} alt="none" src={profilePictureUrl}></img>
        </div>
        <div>
          <Box sx={{ display: 'flex' }}>
            {type === 3 && (
              <div className={style.messageContent}>
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
                        sx={{ margin: '10px 10px 10px 0', display: 'flex', justifyContent: 'space-between' }}
                      >
                        <Typography>{item.text}</Typography>
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
                        sx={{ margin: '10px 10px 10px 0', display: 'flex', justifyContent: 'space-between' }}
                      >
                        <Typography>{item.text}</Typography>
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
              </div>
            )}
            {type === 1 && (
              <Box className={style.messageContent}>
                <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
                  {content}
                </Typography>
              </Box>
            )}
            {type === 2 && (
              <div className={`${style.messageContent} ${style.imageContent}`}>
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
                  src={content}
                  className={style.image}
                  alt=""
                />
              </div>
            )}
          </Box>
          {url && type === 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LinkPreview url={url} className={style.linkPreview} customLoader={<LinkPreviewSkeleteon />} />
            </Box>
          )}
          <div className={style.accountInfor}>
            <Typography sx={{ fontSize: '0.75em' }} variant="subtitle2" className={style.name}>
              {name},
            </Typography>
            <Typography sx={{ fontSize: '0.75em' }} variant="subtitle2">
              {dateUtil.fortmatDate(postedDate)}
            </Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;
