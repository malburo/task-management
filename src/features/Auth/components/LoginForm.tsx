import { yupResolver } from '@hookform/resolvers/yup';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import InputField from 'components/form-control/InputField';
import PasswordField from 'components/form-control/PasswordField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoginWithGitHub from './LoginWithGitHub';

const schema = yup.object().shape({
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
});

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

export interface LoginFormValues {
  account: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const form = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Container maxWidth="xs">
      <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>Log in</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField name="account" placeholder="Your Email or Username*" startIcon={<MailIcon />} form={form} />
        <PasswordField name="password" placeholder="Your password*" startIcon={<LockIcon />} form={form} />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ height: '48px', marginTop: '12px' }}>
          Login now
        </Button>
      </form>
      <Box marginY="24px">
        <Divider>OR</Divider>
      </Box>
      <LoginWithGitHub />
    </Container>
  );
};

export default LoginForm;
