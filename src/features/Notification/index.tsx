/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import notificationApi from 'api/notificationApi';
import { socketClient } from 'api/socketClient';
import { RootState } from 'app/store';
import NotificationCard from 'features/Notification/components/NotificationCard';
import { INotification } from 'models/notification';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NotificationToast from './components/NotificationToast';

const NotificationFeature: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [notificationList, setNotificationList] = useState<INotification[]>([]);
  const [pagination, setPagination] = useState<any>({ limit: 8, page: 1 });

  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        if (!currentUser) return;
        const { data } = await notificationApi.getAll(pagination);
        setNotificationList(data.notifications);
        const newFilter = {
          ...data.pagination,
          page: parseInt(data.pagination.page) + 1,
          limit: parseInt(data.pagination.limit),
        };
        setPagination(newFilter);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivitiesData();
  }, [currentUser]);

  const fetchMoreData = async () => {
    try {
      const { data } = await notificationApi.getAll(pagination);
      const notificationListClone = [...notificationList];
      const newNotificationList = notificationListClone.concat(data.notifications);
      setNotificationList(newNotificationList);
      const newFilter = {
        ...data.pagination,
        page: parseInt(data.pagination.page) + 1,
        limit: parseInt(data.pagination.limit),
      };
      setPagination(newFilter);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (() => {
      socketClient.on('notification:create', (newNotification: INotification) => {
        setNotificationList((prev) => [newNotification, ...prev]);
        if (newNotification.type === 'BOARD:ADD_MEMBER')
          return toast.custom((t) => (
            <Box onClick={() => history.push(`/boards/${newNotification.boardId}`)}>
              <NotificationToast sender={newNotification.senderId} time={newNotification.createdAt}>
                <Typography variant="regular2">
                  {newNotification.senderId.username} invited you to {newNotification.content.board.title}
                </Typography>
              </NotificationToast>
            </Box>
          ));
        if (newNotification.type === 'TASK:DEADLINE_EXPIRED')
          return toast.custom((t) => (
            <Box
              onClick={() =>
                history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`)
              }
            >
              <NotificationToast sender={newNotification.senderId} time={newNotification.createdAt}>
                <Typography variant="regular2">{newNotification.content.task.title} has expired</Typography>
              </NotificationToast>
            </Box>
          ));
        if (newNotification.type === 'TASK:REMINDER')
          return toast.custom((t) => (
            <Box
              onClick={() =>
                history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`)
              }
            >
              <NotificationToast sender={newNotification.senderId} time={newNotification.createdAt}>
                <Typography variant="regular2">{newNotification.content.task.title} is about to expire</Typography>
              </NotificationToast>
            </Box>
          ));
        if (newNotification.type === 'TASK:ASSIGN_MEMBER')
          return toast.custom((t) => (
            <Box
              onClick={() =>
                history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`)
              }
            >
              <NotificationToast sender={newNotification.senderId} time={newNotification.createdAt}>
                <Typography variant="regular2">
                  {newNotification.senderId.username} was assigned {newNotification.content.task.title} to you
                </Typography>
              </NotificationToast>
            </Box>
          ));
        if (newNotification.type === 'TASK:REASSIGN_MEMBER')
          return toast.custom((t) => (
            <Box
              onClick={() =>
                history.push(`/boards/${newNotification.boardId}/tasks/${newNotification.content.task._id}`)
              }
            >
              <NotificationToast sender={newNotification.senderId} time={newNotification.createdAt}>
                <Typography variant="regular2">
                  {newNotification.senderId.username} was reassigned {newNotification.content.task.title} to you
                </Typography>
              </NotificationToast>
            </Box>
          ));
      });
    })();
  }, []);

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
              <Box overflow="scroll">
                <InfiniteScroll
                  dataLength={notificationList.length}
                  next={fetchMoreData}
                  hasMore={Math.ceil(pagination.total / pagination.limit) !== pagination.page - 1}
                  height="400px"
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {notificationList.map((notification) => {
                    if (notification.type === 'BOARD:ADD_MEMBER')
                      return (
                        <Box onClick={() => history.push(`/boards/${notification.boardId}`)} key={notification._id}>
                          <NotificationCard sender={notification.senderId} time={notification.createdAt}>
                            <Typography variant="regular2">
                              {notification.senderId.username} invited you to {notification.content.board.title}
                            </Typography>
                          </NotificationCard>
                        </Box>
                      );
                    if (notification.type === 'TASK:DEADLINE_EXPIRED')
                      return (
                        <Box
                          onClick={() =>
                            history.push(`/boards/${notification.boardId}/tasks/${notification.content.task._id}`)
                          }
                          key={notification._id}
                        >
                          <NotificationCard sender={notification.senderId} time={notification.createdAt}>
                            <Typography variant="regular2">{notification.content.task.title} has expired</Typography>
                          </NotificationCard>
                        </Box>
                      );
                    if (notification.type === 'TASK:REMINDER')
                      return (
                        <Box
                          onClick={() =>
                            history.push(`/boards/${notification.boardId}/tasks/${notification.content.task._id}`)
                          }
                          key={notification._id}
                        >
                          <NotificationCard sender={notification.senderId} time={notification.createdAt}>
                            <Typography variant="regular2">
                              {notification.content.task.title} is about to expire
                            </Typography>
                          </NotificationCard>
                        </Box>
                      );
                    if (notification.type === 'TASK:ASSIGN_MEMBER')
                      return (
                        <Box
                          onClick={() =>
                            history.push(`/boards/${notification.boardId}/tasks/${notification.content.task._id}`)
                          }
                          key={notification._id}
                        >
                          <NotificationCard sender={notification.senderId} time={notification.createdAt}>
                            <Typography variant="regular2">
                              {notification.senderId.username} was assigned {notification.content.task.title} to you
                            </Typography>
                          </NotificationCard>
                        </Box>
                      );
                    if (notification.type === 'TASK:REASSIGN_MEMBER')
                      return (
                        <Box
                          onClick={() =>
                            history.push(`/boards/${notification.boardId}/tasks/${notification.content.task._id}`)
                          }
                          key={notification._id}
                        >
                          <NotificationCard sender={notification.senderId} time={notification.createdAt}>
                            <Typography variant="regular2">
                              {notification.senderId.username} was reassigned {notification.content.task.title} to you
                            </Typography>
                          </NotificationCard>
                        </Box>
                      );
                  })}
                </InfiniteScroll>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default NotificationFeature;
