import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';

const NotificationCard: React.FC = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Avatar sx={{ marginRight: '12px' }} />
        <Typography variant="regular2">malburo</Typography>
      </Box>
    </Box>
  );
};

export default NotificationCard;
