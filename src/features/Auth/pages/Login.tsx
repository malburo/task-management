import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" marginBottom="-80px">
        <LoginForm />
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
