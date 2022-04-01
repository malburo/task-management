import { Avatar, Box, CardMedia, Tooltip, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  message: any;
}

const MyMessage: React.FC<Props> = ({ message }) => {
  return (
    <Box key={message._id} display="flex" padding="12px" borderRadius="8px" flexDirection="row-reverse">
      <Box>
        <Avatar sx={{ marginRight: 4, marginTop: 2 }} src={message.user.profilePictureUrl} />
      </Box>
      <Tooltip title={formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })} placement="left">
        <Box mr={2}>
          {message.type === 'IMAGE' ? (
            <CardMedia
              image={message.content}
              sx={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                cursor: 'pointer',
                ':hover': {
                  opacity: 0.8,
                },
              }}
            />
          ) : (
            <Box bgcolor="#007AFF" color="white" px={4} py={2} borderRadius="4px">
              <Typography>{message.content}</Typography>
            </Box>
          )}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default MyMessage;
