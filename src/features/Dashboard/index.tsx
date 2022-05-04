import { Grid } from '@mui/material';
import Activities from './components/Activities';
import Statistics from './components/Statistics';
import TaskChart from './components/TaskChart';

const DashBoard = () => {
  return (
    <Grid container padding="48px">
      <Grid item xs={12} md={12} lg={8}>
        <Statistics />
        <TaskChart />
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        <Activities />
      </Grid>
    </Grid>
  );
};

export default DashBoard;
