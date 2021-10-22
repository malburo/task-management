/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/system';
import { AppDispatch } from 'app/store';
import { getMe } from 'features/Auth/authSlice';
import useSocket from 'hooks/useSocket';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
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
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
        }}
      />
    </Box>
  );
}

export default App;
