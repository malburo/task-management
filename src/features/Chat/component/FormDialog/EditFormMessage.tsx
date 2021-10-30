import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { updateOne } from 'features/Chat/ReduxSlice/MessagesSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from 'components/form-control/InputField';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import FormStyle from './FormStyle';
import toast from 'react-hot-toast';
import { unwrapResult } from '@reduxjs/toolkit';

interface IPropsAlert {
  isOpen: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
  payload: string;
  contentMsg: string;
}

const scheme = yup
  .object()
  .shape({
    msgContent: yup.string().required('Please enter message').max(200, 'Please enter up to 200 characters'),
  })
  .required();

const EditMessageForm: React.FC<IPropsAlert> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const style = FormStyle();

  const sendForm = useForm({
    defaultValues: {
      msgContent: props.contentMsg,
    },
    resolver: yupResolver(scheme),
  });

  const handleEdit: SubmitHandler<any> = async (data: any) => {
    const toastId = toast.loading('Loading...');
    try {
      if (!data.msgContent) return;
      await dispatch(updateOne({ messageId: props.payload, msgContent: data.msgContent, roomId: room._id })).then(
        unwrapResult
      );
      toast.success('Success', { id: toastId });
      props.setClose(false);
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Dialog open={props.isOpen}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ lineHeight: '32px' }}>Edit</Typography>
        <IconButton color="error" onClick={() => props.setClose(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box>
        <form className={style.form} onSubmit={sendForm.handleSubmit(handleEdit)}>
          <InputField autoComplete="off" name="msgContent" placeholder="type a new message here" form={sendForm} />
        </form>
      </Box>
      <DialogActions>
        <Button startIcon={<SaveIcon />} color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMessageForm;
