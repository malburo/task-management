import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
export interface IParamChatRoom {
  id: string;
}

const ImageLoading: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '400px',
        height: '400px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ImageLoading;
