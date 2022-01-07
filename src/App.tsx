/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/system';
import { socketClient } from 'api/socketClient';
import { AppDispatch, RootState } from 'app/store';
import { getMe } from 'features/Auth/authSlice';
import useSocket from 'hooks/useSocket';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import RoutesComponent from 'routes';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from 'theme';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const socket = useSocket();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('mode')) localStorage.setItem('mode', 'light');
  }, []);

  useEffect(() => {
    (async () => {
      if (!isAuth) return;
      const token = localStorage.getItem('access_token');
      socketClient.emit('auth:token', token);
    })();
  }, [isAuth]);

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
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
    </ThemeProvider>
  );
}

export default App;
