import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';
import { updateOne } from 'features/Chat/ReduxSlice/MessagesSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from 'components/form-control/InputField';
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

interface IFormInput {
  msgContent: string;
}

const EditMessageForm: React.FC<IPropsAlert> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const style = FormStyle();

  const sendForm = useForm<IFormInput>({
    defaultValues: {
      msgContent: props.contentMsg,
    },
    resolver: yupResolver(scheme),
  });

  const handleEdit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const toastId = toast.loading('Loading...');
    try {
      if (!data.msgContent) return;
      await dispatch(updateOne({ _id: props.payload, content: data.msgContent })).then(unwrapResult);
      toast.success('Success', { id: toastId });
      props.setClose(false);
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Dialog open={props.isOpen}>
      <form onSubmit={sendForm.handleSubmit(handleEdit)}>
        <DialogTitle>
          <Typography sx={{ lineHeight: '32px' }}>Edit</Typography>
        </DialogTitle>
        <Box className={style.form}>
          <InputField autoComplete="off" name="msgContent" placeholder="type a new message here" form={sendForm} />
        </Box>
        <DialogActions>
          <Button onClick={() => props.setClose(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditMessageForm;
