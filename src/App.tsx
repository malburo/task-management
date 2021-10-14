/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/system';
import { AppDispatch } from 'app/store';
import { getMe } from 'features/Auth/authSlice';
import useSocket from 'hooks/useSocket';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoutesComponent from 'routes';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocket();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Box>
      <RoutesComponent />
    </Box>
  );
}

export default App;
