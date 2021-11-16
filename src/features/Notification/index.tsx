import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, IconButton, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import notificationApi from 'api/notificationApi';
import { socketClient } from 'api/socketClient';
import { RootState } from 'app/store';
import { INotification } from 'models/notification';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const NotificationFeature: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [notificationList, setNotificationList] = useState<INotification[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;
  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        if (!currentUser) return;
        const { data } = await notificationApi.getAll();
        console.log(data);
        setNotificationList(data.notifications.notifications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivitiesData();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      socketClient.on('notification:create', (newNotification: INotification) => {
        setNotificationList([newNotification, ...notificationList]);
      });
    })();
  }, [notificationList]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <IconButton
        onClick={handleOpen}
        color="inherit"
        sx={{
          marginRight: '12px',
          backgroundColor: 'transparent',
          color: '#898989',
          '&:hover': { backgroundColor: '#efefef' },
          width: '40px',
          height: '40px',
        }}
      >
        <NotificationsIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '12px',
        }}
      >
        <Box padding="16px" minHeight="100px" minWidth="300px">
          <Box>
            <Box padding="12px">
              <Box padding="12px">
                <Typography variant="bold4">Recent notification</Typography>
              </Box>
              <Box maxHeight="400px" overflow="scroll">
                {notificationList.map((notification) => {
                  if (notification.type === 'TASK:ASSIGN_MEMBER')
                    return (
                      <Box
                        display="flex"
                        alignItems="center"
                        padding="12px"
                        borderRadius="8px"
                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#2f80ed', color: 'white' } }}
                      >
                        <Box>
                          <Avatar sx={{ marginRight: '12px' }} src={notification.senderId.profilePictureUrl} />
                        </Box>
                        <Box flex={1}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="regular2">{notification.senderId.username}</Typography>
                            <Typography variant="regular2">2h</Typography>
                          </Box>
                          <Box>
                            <Typography variant="regular2">dẵ thêm công ziệc cho bạn</Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  if (notification.type === 'TASK:REASSIGN_MEMBER')
                    return (
                      <Box>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ marginRight: '12px' }} src={notification.senderId.profilePictureUrl} />
                          <Typography variant="regular2">
                            {notification.senderId.username} dẵ xoa ban khỏi cong viec
                          </Typography>
                        </Box>
                      </Box>
                    );
                })}
              </Box>
              <Box padding="12px" textAlign="center">
                <Typography variant="bold4">Load more...</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default NotificationFeature;
