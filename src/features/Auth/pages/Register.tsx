import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../authSlice';
import RegisterForm, { RegisterFormValues } from '../components/RegisterForm';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await dispatch(register(values)).then(unwrapResult);
      history.push('/boards');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" marginBottom="-80px">
        <RegisterForm onSubmit={handleSubmit} />
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
        Already have an account? <Link to="/auth/login">Log in</Link>
      </Box>
    </>
  );
};

export default Register;
