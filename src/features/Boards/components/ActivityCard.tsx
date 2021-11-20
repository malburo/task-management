import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formatDistanceToNow } from 'date-fns';
import { IUser } from 'models/user';

interface Props {
  sender: IUser;
  time: Date;
}
const ActivityCard: React.FC<Props> = ({ sender, children, time }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      padding="12px"
      borderRadius="8px"
      sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f4f4f4' } }}
      bgcolor="#f8f9fd"
      marginY="12px"
    >
      <Box>
        <Avatar sx={{ marginRight: '12px' }} src={sender.profilePictureUrl} />
      </Box>
      <Box flex={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="regular2">{sender.username}</Typography>
          <Typography variant="regular2">{formatDistanceToNow(new Date(time))}</Typography>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default ActivityCard;
