import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <Paper>
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" marginBottom="-80px">
        <RegisterForm />
      </Box>
      <Box
        boxSizing="border-box"
        height="80px"
        width="100%"
        borderTop="1px solid rgba(0, 0, 0, 0.12)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Already have an account? <Link to="/auth/login">Log in</Link>
      </Box>
    </Paper>
  );
};

export default Register;
