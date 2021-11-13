import { Box } from '@mui/system';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';

const Statistics = () => {
  return (
    <Box
      padding="24px"
      boxSizing="border-box"
      borderRadius="12px"
      width="800px"
      display="flex"
      bgcolor="#fff"
      justifyContent="space-around"
    >
      <Box display="flex" alignItems="center">
        <Box
          bgcolor="#FFF2E9"
          width="80px"
          height="80px"
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
              20
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box
          bgcolor="#EDE8FF"
          width="80px"
          height="80px"
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
              20
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box
          bgcolor="#EAF9FF"
          width="80px"
          height="80px"
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
              20
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box
          bgcolor="#FFEBEF"
          width="80px"
          height="80px"
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
              Unfinished
            </Typography>
          </Box>
          <Box>
            <Typography variant="regular2" color="initial">
              20
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Statistics;
