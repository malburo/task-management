import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
export interface IParamChatRoom {
  id: string;
}

const Loader: React.FC = () => {
  return (
    <Box textAlign="center" marginTop={5}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
