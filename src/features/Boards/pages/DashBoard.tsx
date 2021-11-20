import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import SideBar from 'components/SideBar';
import Activities from '../components/Activities';
import Statistics from '../components/Statistics';
import TaskChart from '../components/TaskChart';

const DashBoard = () => {
  return (
    <Stack direction="row">
      <SideBar />
      <Box height="100vh" flex={1} sx={{ overflowX: 'scroll' }}>
        <Box height="65px" />
        <Grid container padding="48px">
          <Grid item xs={12} md={12} lg={8}>
            <Statistics />
            <TaskChart />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Activities />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default DashBoard;
