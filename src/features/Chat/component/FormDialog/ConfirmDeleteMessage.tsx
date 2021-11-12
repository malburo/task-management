import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import { Dispatch, SetStateAction } from 'react-transition-group/node_modules/@types/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';
import { deleteOne } from 'features/Chat/ReduxSlice/MessagesSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface IPropsAlert {
  isOpen: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  payload: string;
}

const ConfirmDeleteMessage: React.FC<IPropsAlert> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    const toastId = toast.loading('Loading...');
    try {
      await dispatch(deleteOne(props.payload)).then(unwrapResult);
      toast.success('Success', { id: toastId });
      props.setClose(false);
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Dialog open={props.isOpen}>
      <DialogTitle>
        <Typography sx={{ lineHeight: '32px' }}>Confirm</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: '#afafaf', fontSize: 20, fontWeight: 500 }}>
          Are you sure to delete this message?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setClose(false)} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" variant="contained" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteMessage;
