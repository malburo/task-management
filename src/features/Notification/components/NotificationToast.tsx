import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IUser } from 'models/user';

interface Props {
  sender: IUser | undefined;
  time: Date;
}
const NotificationToast: React.FC<Props> = ({ sender, children, time }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      padding="12px"
      borderRadius="8px"
      sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f4f4f4' } }}
      bgcolor="white"
      marginY="12px"
      boxShadow="0 8px 30px rgba(0,0,0,0.12)"
      maxWidth="350px"
    >
      <Box>
        <Avatar sx={{ marginRight: '12px' }} src={sender?.profilePictureUrl} />
      </Box>
      <Box flex={1} paddingRight="24px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="regular3">{sender ? sender.username : 'System'}</Typography>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default NotificationToast;
