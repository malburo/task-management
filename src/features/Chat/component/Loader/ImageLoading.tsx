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
        width: '100%',
        height: '200px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default ImageLoading;
