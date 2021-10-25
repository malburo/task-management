import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';
import { Dispatch, SetStateAction } from 'react-transition-group/node_modules/@types/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';
import { deleteOne } from 'features/Chat/ReduxSlice/MessagesSlice';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

interface IPropsAlert {
  isOpen: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  payload: string;
}

const ConfirmDeleteMessage: React.FC<IPropsAlert> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteOne({ messageId: props.payload }));
    props.setClose(false);
  };

  return (
    <Dialog open={props.isOpen}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ lineHeight: '32px' }}>Confirm</Typography>
        <IconButton color="error" onClick={() => props.setClose(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '10px' }}>
          Are you sure to delete this message?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="success" startIcon={<DoneIcon />}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteMessage;