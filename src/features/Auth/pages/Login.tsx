import { makeStyles } from '@material-ui/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../authSlice';
import LoginForm, { LoginFormValues } from '../components/LoginForm';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(login(values)).then(unwrapResult);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.wrapper}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
