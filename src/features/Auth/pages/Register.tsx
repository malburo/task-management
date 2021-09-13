import { makeStyles } from '@material-ui/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../authSlice';
import RegisterForm, { RegisterFormValues } from '../components/RegisterForm';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await dispatch(register(values)).then(unwrapResult);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.wrapper}>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
