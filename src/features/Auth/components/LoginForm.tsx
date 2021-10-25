import { yupResolver } from '@hookform/resolvers/yup';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
import { login } from '../authSlice';
import LoginWithGitHub from './LoginWithGitHub';

const schema = yup
  .object()
  .shape({
    account: yup
      .string()
      .required('Please enter email or username.')
      .min(6, 'Please enter at least 6 characters.')
      .max(35, 'Please enter at most 35 characters'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters.')
      .max(30, 'Please enter at most 30 characters'),
  })
  .required();

export interface LoginFormValues {
  account: string;
  password: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const form = useForm<LoginFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    setIsLoading(true);
    const toastId = toast.loading('Loading...');
    try {
      await dispatch(login(values)).then(unwrapResult);
      history.push('/boards');
      toast.success('Login successfully!', { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>Log in</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField name="account" placeholder="Your Email or Username*" startIcon={<MailIcon />} form={form} />
        <PasswordField name="password" placeholder="Your password*" startIcon={<LockIcon />} form={form} />
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ height: '48px', marginTop: '12px' }}
          disabled={isLoading}
        >
          Login now
        </LoadingButton>
      </form>
      <Box marginY="24px">
        <Divider>OR</Divider>
      </Box>
      <LoginWithGitHub />
    </Container>
  );
};

export default LoginForm;
