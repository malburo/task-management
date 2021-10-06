import React, { ReactElement, useEffect, useState } from 'react';
import MyMessageStyle from './MyMessageStyle';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Alert, Dialog, DialogTitle, IconButton, Snackbar, Tooltip, Typography } from '@mui/material';
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
import { clearResponse } from 'features/Chat/ReduxSlice/MessagesSlice';
import useChat from 'features/Chat/customHook/useChat';

interface IMessagePros {
  postedDate: Date;
  content: string;
  profilePictureUrl: string;
  renderTimeLine: Boolean;
  time: Date;
  _id: string;
}

const scheme = yup
  .object()
  .shape({
    msgContent: yup.string().required('Please enter message').max(100, 'Please enter up to 100 characters'),
  })
  .required();

const MyMessage: React.FC<IMessagePros> = ({ _id, postedDate, content, profilePictureUrl, renderTimeLine, time }) => {
  const style = MyMessageStyle();
  const dispatch = useDispatch<AppDispatch>();
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<ReactElement>();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [contentMsg, setContentMsg] = useState<string>(content);
  const response = useSelector((state: RootState) => state.message.response);
  const { sendDeleteMessage, sendEditMessage } = useChat();

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
    sendDeleteMessage(_id);
    //dispatch(deleteOne({ messageId: _id }));
    setDeleteDialog(false);
  };
  const handleEdit = (data: any) => {
    if (!data.msgContent) return;
    sendEditMessage(_id, data.msgContent);
    //dispatch(updateOne({ messageId: _id, msgContent: data.msgContent, roomId: room._id }));
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

  const closeSnackbar = () => {
    setOpenSnackBar(false);
    dispatch(clearResponse());
  };
  useEffect(() => {
    if (response.status === 0) setOpenSnackBar(false);
    else setOpenSnackBar(true);
  }, [response]);

  return (
    <React.Fragment>
      {response.message && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={closeSnackbar}
          sx={{
            opacity: '0.3',
            marginTop: '6vh',
          }}
        >
          <Alert severity={`${response.status === -1 ? 'error' : 'success'}`} sx={{ width: '100%' }}>
            {response.message}
          </Alert>
        </Snackbar>
      )}
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
              <IconButton className={style.iconButtonTool} onClick={handleOpenEdit}>
                <Edit />
              </IconButton>
            </React.Fragment>
          }
          placement="left-start"
        >
          <div>
            <div>
              <Typography variant="body2" className={style.messageContent}>
                {contentMsg}
              </Typography>
            </div>
            <div className={style.accountInfor}>
              <Typography variant="subtitle2" className={style.date}>
                {dateUtil.fortmatDate(postedDate)}
              </Typography>
            </div>
          </div>
        </Tooltip>

        <div className={style.avatar}>
          <img className={style.avatarImg} alt="none" src={profilePictureUrl}></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyMessage;
