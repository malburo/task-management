import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
export interface IParamChatRoom {
  id: string;
}

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        width: '100%',
        marginTop: '8px',
        // eslint-disable-next-line
        ['@media (min-width: 900px)']: {
          marginLeft: '20%',
        },
        // eslint-disable-next-line
        ['@media (max-width: 900px)']: {
          justifyContent: 'space-around',
        },
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
