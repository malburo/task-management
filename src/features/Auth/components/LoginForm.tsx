/* eslint-disable no-useless-escape */
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/styles';
import { AppDispatch } from 'app/store';
import InputField from 'components/form-control/InputField';
import PasswordField from 'components/form-control/PasswordField';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { getMe, logout } from '../authSlice';

const useStyles = makeStyles((theme: any) => ({
  submit: {
    margin: 2,
  },
}));

const schema = yup.object().shape({
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
});

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => any;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const loginWithGithub = async () => {
    window.open('http://localhost:8000/api/auth/github', '_self');
  };
  const handleLogout = async () => {
    await dispatch(logout());
  };
  const handlegetme = async () => {
    await dispatch(getMe());
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          border: '1px solid #bdbdbd',
          borderRadius: '24px',
          padding: '32px 48px',
        }}
      >
        <p onClick={handleLogout}>logout</p>
        <p onClick={handlegetme}>getme</p>
        <Typography variant="subtitle1">Bullo app</Typography>
        <Typography variant="subtitle2">Join to discover thousands of photos from around the world</Typography>
        <Typography variant="subtitle1">
          Beautiful, free images and photos that you can download and use for any project.
        </Typography>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputField name="email" placeholder="Your Email*" startIcon={<MailIcon />} form={form} />
          <PasswordField name="password" placeholder="Your password*" startIcon={<LockIcon />} form={form} />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Login now
          </Button>
          <Typography variant="subtitle1" align="center">
            Not registered yet?
            <Link to="/auth/register">Register</Link>
          </Typography>
          <p onClick={loginWithGithub}>login with github</p>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
