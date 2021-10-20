import { Box } from '@mui/system';
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
export interface IParamChatRoom {
  id: string;
}

const ImageFailed: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '30vw',
        height: '30vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: '10rem' }} />
    </Box>
  );
};

export default ImageFailed;
