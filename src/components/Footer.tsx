import { Box } from '@mui/system';

const Footer = () => {
  return (
    <Box
      boxSizing="border-box"
      bgcolor="white"
      height="80px"
      width="100%"
      borderTop="1px solid rgba(0, 0, 0, 0.12)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Copyright © 2021 Task Management
    </Box>
  );
};

export default Footer;
