import React, { ReactElement, useEffect, useState } from 'react';
import MyMessageStyle from './MyMessageStyle';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Button, IconButton, Input, Tooltip, Typography } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import Edit from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import ImageLoading from '../Loader/ImageLoading';
import ImageFailed from '../Loader/ImageFailed';
import ISelectFormMessage from 'models/selectMessage';
import { IUser } from 'models/user';
import messageApi from 'api/messageApi';
import ConfirmDeleteMessage from '../FormDialog/ConfirmDeleteMessage';
import EditMessageForm from '../FormDialog/EditFormMessage';

interface IMessagePros {
  postedDate: Date;
  content: string;
  profilePictureUrl: string;
  renderTimeLine: Boolean;
  time: Date;
  _id: string;
  type: Number;
  form?: ISelectFormMessage;
}

const MyMessage: React.FC<IMessagePros> = ({
  _id,
  postedDate,
  content,
  profilePictureUrl,
  renderTimeLine,
  time,
  type,
  form,
}) => {
  const style = MyMessageStyle();
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const [timeline, setTimeline] = useState<ReactElement>();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [contentMsg, setContentMsg] = useState<string>(content);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  const room = useSelector((state: RootState) => state.room.roomInfor);

  useEffect(() => {
    setContentMsg(content);
  }, [content]);

  const handleOpenDelete = () => {
    setDeleteDialog(true);
  };
  const handleOpenEdit = () => {
    setEditDialog(true);
  };
  useEffect(() => {
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(time)} />);
  }, [renderTimeLine, time]);

  const chooseOption = (e: React.FormEvent<HTMLButtonElement>) => {
    messageApi.chooseOption({ optionId: e.currentTarget.value, roomId: room._id });
  };

  const renderMessage = () => {
    if (type === 1)
      return (
        <div className={style.messageContent}>
          <Typography variant="body2">{contentMsg}</Typography>
        </div>
      );
    else if (type === 2)
      return (
        <div className={`${style.messageContent} ${style.imageContent}`}>
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
            src={contentMsg}
            alt=""
          />
        </div>
      );
    else if (type === 3)
      return (
        <div className={style.messageContent}>
          <Typography variant="body2" sx={{ minWidth: '200px' }}>
            {contentMsg}
          </Typography>
          {form?.options?.map((item) => {
            if (item.userId.filter((i) => i === me._id).length > 0)
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
                  value={item._id}
                  fullWidth
                  onClick={chooseOption}
                  variant="contained"
                  color="secondary"
                  sx={{ margin: '10px 10px 10px 0', display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography>{item.text}</Typography>
                  <Typography>{item.userId.length > 0 ? item.userId.length : ''}</Typography>
                </Button>
              );
          })}
          {form?.isAddNew && (
            <Input placeholder="type new item here" fullWidth sx={{ paddingLeft: '10px', fontSize: '0.75em' }}></Input>
          )}
        </div>
      );
  };

  return (
    <React.Fragment>
      <ConfirmDeleteMessage isOpen={deleteDialog} setClose={setDeleteDialog} payload={_id} />
      <EditMessageForm isOpen={editDialog} setClose={setEditDialog} payload={_id} contentMsg={content} />
      {timeline}

      <div className={style.message}>
        <div>
          <div>
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
          </div>
          <div className={style.accountInfor}>
            <Typography variant="subtitle2" className={style.date}>
              {dateUtil.fortmatDate(postedDate)}
            </Typography>
          </div>
        </div>

        <div className={style.avatar}>
          <img className={style.avatarImg} alt="none" src={profilePictureUrl}></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyMessage;
