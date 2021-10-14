import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../authSlice';
import LoginForm, { LoginFormValues } from '../components/LoginForm';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await dispatch(login(values)).then(unwrapResult);
      history.push('/boards');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" marginBottom="-80px">
        <LoginForm onSubmit={handleSubmit} />
      </Box>
      <Box
        boxSizing="border-box"
        bgcolor="white"
        height="80px"
        width="100%"
        borderTop="1px solid rgba(0, 0, 0, 0.12)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Don't have an account ?<Link to="/auth/register">Sign Up</Link>
      </Box>
    </>
  );
};

export default Login;
