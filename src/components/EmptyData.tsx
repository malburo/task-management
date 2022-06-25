import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import EmptyIMG from 'images/Empty.svg';
const EmptyData = () => {
  return (
    <Box m="30px auto" textAlign="center">
      <img src={EmptyIMG} alt="" />
      <Typography>No data to display</Typography>
    </Box>
  );
};

export default EmptyData;
