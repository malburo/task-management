import React, { ReactElement, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import MyMessageStyle from './MyMessageStyle';
import dateUtil from 'utilities/dateUtil';
import TimeLine from '../HorizontalRule/TimeLine';
import { Dialog, DialogTitle, FormControl, IconButton, TextField, Tooltip } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { Box } from '@material-ui/system';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import Edit from '@material-ui/icons/Edit';
interface IMessagePros {
  postedDate: Date;
  content: string;
  profilePictureUrl: string;
  renderTimeLine: Boolean;
  time: Date;
  _id: string;
}

const MyMessage: React.FC<IMessagePros> = ({ _id, postedDate, content, profilePictureUrl, renderTimeLine, time }) => {
  const style = MyMessageStyle();
  const [timeline, setTimeline] = useState<ReactElement>();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const handleDelete = () => {
    console.log(_id);
    setDeleteDialog(false);
  };
  const handleEdit = () => {
    console.log(_id);
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
    if (renderTimeLine == true) setTimeline(<TimeLine time={new Date(time)} />);
  }, [renderTimeLine]);
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
        <Typography variant="body2" className={style.messageContent}>
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
          <FormControl sx={{ width: '40vw', padding: '0 2vw 2vw 2vw' }}>
            <TextField placeholder="type a new message here" />
          </FormControl>
        </Box>

        <Box
          sx={{
            height: '50px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <IconButton
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
      </Dialog>
      {timeline}

      <div className={style.message}>
        <Tooltip
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
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
                {content}
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
