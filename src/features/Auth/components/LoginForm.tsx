/* eslint-disable no-useless-escape */
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@mui/styles';
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
  const form = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    // defaultValues: {
    //   account: '',
    //   password: '',
    // },
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={loginWithGithub}
            style={{ marginTop: 12, backgroundColor: 'black', color: 'white' }}
          >
            login with github
          </Button>
          <Typography variant="subtitle1" align="center">
            Not registered yet?
            <Link to="/auth/register">Register</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
