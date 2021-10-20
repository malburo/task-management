import React, { ReactElement, useEffect, useState } from 'react';
import MyMessageStyle from './MyMessageStyle';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Dialog, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Edit from '@mui/icons-material/Edit';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form-control/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { deleteOne, updateOne } from 'features/Chat/ReduxSlice/MessagesSlice';
import ImageLoading from '../Loader/ImageLoading';
import ImageFailed from '../Loader/ImageFailed';

interface IMessagePros {
  postedDate: Date;
  content: string;
  profilePictureUrl: string;
  renderTimeLine: Boolean;
  time: Date;
  _id: string;
  type: Number;
}

const scheme = yup
  .object()
  .shape({
    msgContent: yup.string().required('Please enter message').max(100, 'Please enter up to 100 characters'),
  })
  .required();

const MyMessage: React.FC<IMessagePros> = ({
  _id,
  postedDate,
  content,
  profilePictureUrl,
  renderTimeLine,
  time,
  type,
}) => {
  const style = MyMessageStyle();
  const dispatch = useDispatch<AppDispatch>();

  const [timeline, setTimeline] = useState<ReactElement>();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [contentMsg, setContentMsg] = useState<string>(content);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  const room = useSelector((state: RootState) => state.room.roomInfor);

  const form = useForm({
    defaultValues: {
      msgContent: contentMsg,
    },
    resolver: yupResolver(scheme),
  });

  useEffect(() => {
    setContentMsg(content);
  }, [content]);

  const handleDelete = () => {
    dispatch(deleteOne({ messageId: _id }));
    setDeleteDialog(false);
  };
  const handleEdit = (data: any) => {
    if (!data.msgContent) return;
    dispatch(updateOne({ messageId: _id, msgContent: data.msgContent, roomId: room._id }));
    setEditDialog(false);
  };
  const handleClose = () => {
    setDeleteDialog(false);
    setEditDialog(false);
  };
  const handleOpenDelete = () => {
    setDeleteDialog(true);
  };
  const handleOpenEdit = () => {
    setEditDialog(true);
  };
  useEffect(() => {
    if (renderTimeLine === true) setTimeline(<TimeLine time={new Date(time)} />);
  }, [renderTimeLine, time]);

  return (
    <React.Fragment>
      <Dialog open={deleteDialog}>
        <DialogTitle
          sx={{
            textAlign: 'center',
          }}
        >
          Confirm
        </DialogTitle>
        <Typography variant="body2" sx={{ margin: '0 20px 20px 20px ', textAlign: 'center' }}>
          Are you sure to delete this message?
        </Typography>
        <Box
          sx={{
            height: '50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <IconButton
            onClick={handleDelete}
            sx={{
              width: '40%',
              backgroundColor: 'green',
            }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={handleClose}
            sx={{
              width: '40%',
              backgroundColor: 'red',
            }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      </Dialog>
      <Dialog open={editDialog}>
        <DialogTitle
          sx={{
            textAlign: 'center',
          }}
        >
          Edit Message
        </DialogTitle>
        <Box>
          <form className={style.editForm} onSubmit={form.handleSubmit(handleEdit)}>
            <InputField autoComplete="off" name="msgContent" placeholder="type a new message here" form={form} />
            <Box
              sx={{
                marginTop: '20px',
                height: '50px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <IconButton
                type="submit"
                onClick={handleEdit}
                sx={{
                  width: '40%',
                }}
              >
                <SaveIcon />
              </IconButton>
              <IconButton
                onClick={handleClose}
                sx={{
                  width: '40%',
                  backgroundColor: 'red',
                }}
              >
                <CancelIcon />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Dialog>
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
                {type === 1 ? (
                  <div className={style.messageContent}>
                    <Typography variant="body2">{contentMsg}</Typography>
                  </div>
                ) : (
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
                )}
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
