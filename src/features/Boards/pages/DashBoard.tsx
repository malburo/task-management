import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import SideBar from 'components/SideBar';
import Activities from '../components/Activities';
import Statistics from '../components/Statistics';
import TaskChart from '../components/TaskChart';

const DashBoard = () => {
  return (
    <Stack direction="row">
      <SideBar />
      <Box height="100vh" flex={1} overflow="hidden">
        <Box height="65px" />
        <Box height="calc(100vh - 145px)" padding="48px" display="flex">
          <Activities />
          <Box>
            <Statistics />
            <TaskChart />
          </Box>
          <Box>
            <Activities />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default DashBoard;
