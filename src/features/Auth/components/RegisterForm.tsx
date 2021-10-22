/* eslint-disable no-useless-escape */
import { yupResolver } from '@hookform/resolvers/yup';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import { LoadingButton } from '@mui/lab';
import { Divider, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';
import InputField from 'components/form-control/InputField';
import PasswordField from 'components/form-control/PasswordField';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { register } from '../authSlice';
import LoginWithGitHub from './LoginWithGitHub';

const schema = yup
  .object()
  .shape({
    fullname: yup
      .string()
      .required('Please enter your fullname.')
      .min(2, 'Please enter at least 2 characters.')
      .max(30, 'Please enter at most 30 characters'),
    username: yup
      .string()
      .required('Please enter your username.')
      .min(2, 'Please enter at least 2 characters.')
      .max(30, 'Please enter at most 30 characters'),
    email: yup
      .string()
      .required('Please enter your email.')
      .min(6, 'Please enter at least 6 characters.')
      .max(35, 'Please enter at most 35 characters')
      .matches(/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/, 'Please enter a valid email address.'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters.')
      .max(30, 'Please enter at most 30 characters'),
    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match'),
  })
  .required();

export interface RegisterFormValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
  retypePassword: string;
}

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const form = useForm<RegisterFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      fullname: '',
      username: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    setIsLoading(true);
    const toastId = toast.loading('Loading...');
    try {
      await dispatch(register(values)).then(unwrapResult);
      history.push('/boards');
      toast.success('Register successfully!', { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>Sign up</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display="flex">
          <Box marginRight="12px" width="100%">
            <InputField name="fullname" placeholder="Your fullname*" startIcon={<PersonIcon />} form={form} />
          </Box>
          <InputField name="username" placeholder="Your username*" startIcon={<PersonIcon />} form={form} />
        </Box>
        <InputField name="email" placeholder="Your email*" startIcon={<MailIcon />} form={form} />
        <PasswordField name="password" placeholder="Your password*" startIcon={<LockIcon />} form={form} />
        <PasswordField name="retypePassword" placeholder="Retype password*" startIcon={<LockIcon />} form={form} />
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ height: '48px', marginTop: '12px' }}
          disabled={isLoading}
        >
          Register now
        </LoadingButton>
      </form>
      <Box marginY="24px">
        <Divider>OR</Divider>
      </Box>
      <LoginWithGitHub />
    </Container>
  );
};

export default RegisterForm;
