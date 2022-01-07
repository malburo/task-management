import { Paper } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <Paper>
      <Box
        boxSizing="border-box"
        height="80px"
        width="100%"
        borderTop="1px solid rgba(0, 0, 0, 0.12)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Copyright © 2021 Task Management
      </Box>
    </Paper>
  );
};

export default Footer;
