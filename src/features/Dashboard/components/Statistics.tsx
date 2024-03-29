import { Box } from '@mui/system';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { ITask } from 'models/task';
import { Grid } from '@mui/material';
import { membersSelector, tasksSelector } from 'features/Boards/boardSlice';

const Statistics = () => {
  const members = useSelector(membersSelector.selectIds);
  const tasks: ITask[] = useSelector(tasksSelector.selectAll);
  return (
    <Box padding="24px" boxSizing="border-box" borderRadius="12px" boxShadow="0 8px 30px rgba(0,0,0,0.12)">
      <Grid container>
        <Grid item sm={6} md={3}>
          <Box display="flex" alignItems="center" marginBottom="12px">
            <Box
              bgcolor="#FFF2E9"
              width="100px"
              height="100px"
              borderRadius="16px"
              marginRight="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <GroupIcon sx={{ color: '#FF6A00' }} />
            </Box>
            <Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  Members
                </Typography>
              </Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  {members.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} md={3}>
          <Box display="flex" alignItems="center" marginBottom="12px">
            <Box
              bgcolor="#EDE8FF"
              width="100px"
              height="100px"
              borderRadius="16px"
              marginRight="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <AssignmentIcon sx={{ color: '#551FFF' }} />
            </Box>
            <Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  Tasks
                </Typography>
              </Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  {tasks.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} md={3}>
          <Box display="flex" alignItems="center" marginBottom="12px">
            <Box
              bgcolor="#EAF9FF"
              width="100px"
              height="100px"
              borderRadius="16px"
              marginRight="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TaskIcon sx={{ color: '#00B7FE' }} />
            </Box>
            <Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  Complete
                </Typography>
              </Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  {tasks.filter((task) => task.status === 'FINISHED').length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} md={3}>
          <Box display="flex" alignItems="center" marginBottom="12px">
            <Box
              bgcolor="#FFEBEF"
              width="100px"
              height="100px"
              borderRadius="16px"
              marginRight="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ErrorIcon sx={{ color: '#FD2254' }} />
            </Box>
            <Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  Expired
                </Typography>
              </Box>
              <Box>
                <Typography variant="regular2" color="initial">
                  {tasks.filter((task) => task.status === 'DEADLINE_EXPIRED').length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
