/* eslint-disable no-useless-escape */
import { yupResolver } from '@hookform/resolvers/yup';
import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/styles';
import InputField from 'components/form-control/InputField';
import PasswordField from 'components/form-control/PasswordField';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: 4,
  },
}));

const schema = yup.object().shape({
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
});

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
}

export interface RegisterFormValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
  retypePassword: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    // defaultValues: {
    //   fullname: '',
    //   username: '',
    //   email: '',
    //   password: '',
    //   retypePassword: '',
    // },
    resolver: yupResolver(schema),
  });

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
          <InputField name="fullname" placeholder="Your fullname*" startIcon={<PersonIcon />} form={form} />
          <InputField name="username" placeholder="Your username*" startIcon={<PersonIcon />} form={form} />
          <InputField name="email" placeholder="Your email*" startIcon={<MailIcon />} form={form} />
          <PasswordField name="password" placeholder="Your password*" startIcon={<LockIcon />} form={form} />
          <PasswordField name="retypePassword" placeholder="Retype password*" startIcon={<LockIcon />} form={form} />

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Register now
          </Button>
          <Typography variant="subtitle1" align="center">
            Already registered?
            <Link to="/auth/login">Login</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterForm;
