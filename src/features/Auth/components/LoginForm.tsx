/* eslint-disable no-useless-escape */
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/styles';
import InputField from 'components/form-control/InputField';
import PasswordField from 'components/form-control/PasswordField';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const useStyles = makeStyles((theme: any) => ({
  submit: {
    margin: 2,
  },
}));

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
  const classes = useStyles();
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const loginWithGithub = async () => {
    window.open('http://localhost:8000/api/auth/github', '_self');
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
        <Typography variant="subtitle1">Bullo app</Typography>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputField name="account" placeholder="Your Email or Username*" startIcon={<MailIcon />} form={form} />
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
