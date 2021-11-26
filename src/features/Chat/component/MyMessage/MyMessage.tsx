import React, { ReactElement, useEffect, useState } from 'react';
import MyMessageStyle from './MyMessageStyle';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Button, IconButton, Input, Tooltip, Typography, Box, Stack } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import ImageLoading from '../Loader/ImageLoading';
import ImageFailed from '../Loader/ImageFailed';
import ISelectFormMessage from 'models/selectMessage';
import { IUser } from 'models/user';
import messageApi from 'api/messageApi';
import theme from 'theme';
import ConfirmDeleteMessage from '../FormDialog/ConfirmDeleteMessage';
import EditMessageForm from '../FormDialog/EditFormMessage';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import LinkPreviewSkeleteon from '../skeleton/LinkPreviewSkeletion';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';

interface IMessagePros {
  postedDate: Date;
  content: string;
  renderTimeLine: Boolean;
  time: Date;
  _id: string;
  type: Number;
  form?: ISelectFormMessage;
  setImageView: (value: boolean) => void;
  setImageSrc: (value: string) => void;
}

const MyMessage: React.FC<IMessagePros> = (props) => {
  const { content, renderTimeLine, type, form, setImageSrc, setImageView } = props;
  const style = MyMessageStyle(theme);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const [timeline, setTimeline] = useState<ReactElement>();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [contentMsg, setContentMsg] = useState<string>(content);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);
  const [url, setUrl] = useState<string>();
  let sortedData = [...(form?.options ?? [])].sort((a, b) => (b.userId?.length ?? 0) - (a.userId?.length ?? 0));

  const room = useSelector((state: RootState) => state.room.roomInfor);

  useEffect(() => {
    setContentMsg(content);
    // eslint-disable-next-line
    const urlRegex = /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/m;
    const data = content.match(urlRegex);
    if (data) setUrl(data[0]);
    else setUrl(undefined);
  }, [content]);

  const handleOpenDelete = () => {
    setDeleteDialog(true);
  };
  const handleOpenEdit = () => {
    setEditDialog(true);
  };

  const addToOptions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.length > 0 && form) {
      messageApi.addOption({ roomId: room._id, text: e.currentTarget.value, formId: form._id });
      e.currentTarget.value = '';
    }
  };

  useEffect(() => {
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(props.time)} />);
  }, [renderTimeLine, props.time]);

  const chooseOption = (e: React.FormEvent<HTMLButtonElement>) => {
    messageApi.chooseOption(room._id, e.currentTarget.value);
  };

  const renderMessage = () => {
    if (type === 1)
      return (
        <Box className={style.messageContent}>
          <Typography variant="body2" sx={{ maxWidth: '60vw', overflowX: 'hidden' }}>
            {contentMsg}
          </Typography>
        </Box>
      );
    else if (type === 2)
      return (
        <Box className={`${style.messageContent} ${style.imageContent}`}>
          {isLoading && <ImageLoading />}
          {isError && <ImageFailed />}
          <img
            className={style.image}
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
            src={contentMsg}
            alt=""
          />
        </Box>
      );
    else if (type === 3)
      return (
        <div className={style.messageContent} style={{ minWidth: '150px' }}>
          <Stack direction="row" justifyContent="space-between">
            <AlignVerticalBottomIcon sx={{ float: 'left' }} />
            <Typography variant="body2" sx={{ marginBottom: '20px' }}>
              {contentMsg}
            </Typography>
          </Stack>
          {sortedData.map((item) => {
            if (item.userId.filter((i) => i === me._id).length > 0)
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
                  value={item._id}
                  fullWidth
                  onClick={chooseOption}
                  variant="contained"
                  color="secondary"
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
              onKeyDown={addToOptions}
              fullWidth
              sx={{ paddingLeft: '10px', fontSize: '0.75em' }}
            ></Input>
          )}
        </div>
      );
  };

  return (
    <React.Fragment>
      <ConfirmDeleteMessage isOpen={deleteDialog} setClose={setDeleteDialog} payload={props._id} />
      <EditMessageForm isOpen={editDialog} setClose={setEditDialog} payload={props._id} contentMsg={content} />
      {timeline}

      <div className={style.message}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
              arrow
              title={
                <React.Fragment>
                  <IconButton className={style.iconButtonTool} onClick={handleOpenDelete}>
                    <Delete />
                  </IconButton>
                  {type === 1 && (
                    <IconButton className={style.iconButtonTool} onClick={handleOpenEdit}>
                      <Edit />
                    </IconButton>
                  )}
                </React.Fragment>
              }
              placement="left-start"
            >
              {renderMessage() as ReactElement}
            </Tooltip>
          </Box>

          {url && type === 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LinkPreview url={url} className={style.linkPreview} customLoader={<LinkPreviewSkeleteon />} />
            </Box>
          )}
          <div className={style.accountInfor}>
            <Typography variant="subtitle2" sx={{ fontSize: '0.75em' }} className={style.date}>
              {dateUtil.fortmatDate(props.postedDate)}
            </Typography>
          </div>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default MyMessage;
