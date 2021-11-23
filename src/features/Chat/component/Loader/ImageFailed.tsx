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
        width: '100%',
        height: '200px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: '5rem', paddingX: '10rem' }} />
    </Box>
  );
};

export default ImageFailed;
