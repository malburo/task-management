/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Button, IconButton, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import notificationApi from 'api/notificationApi';
import { socketClient } from 'api/socketClient';
import { RootState } from 'app/store';
import EmptyData from 'components/EmptyData';
import NotificationCard from 'features/Notification/components/NotificationCard';
import useNotification from 'hooks/useNotification';
import { INotification } from 'models/notification';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import NotificationToast from './components/NotificationToast';

const NotificationFeature: React.FC = () => {
  const notiList = useNotification();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [notificationList, setNotificationList] = useState<INotification[]>([]);
  const [pagination, setPagination] = useState<any>({ limit: 8, page: 1 });

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
    socketClient.on('notification:create', (newNotification: INotification) => {
      setNotificationList((prev) => [newNotification, ...prev]);
      const noti = notiList.find((noti: any) => noti.type === newNotification.type);
      if (!noti) return;
      toast.custom((t) => (
        <Box onClick={() => noti.onClick(newNotification)}>
          <NotificationToast sender={newNotification.senderId} time={newNotification.createdAt}>
            <Typography variant="regular2">{noti.message(newNotification)}</Typography>
          </NotificationToast>
        </Box>
      ));
    });
    return () => {
      socketClient.off('notification:create');
    };
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDeleteAll = async () => {
    try {
      const { data } = await notificationApi.deleteAll();
      setNotificationList([]);
    } catch (error) {
      console.log(error);
    }
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
        <Badge color="error" badgeContent={notificationList.length}>
          <NotificationsIcon />
        </Badge>
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
              <Box>
                {notificationList.length === 0 ? (
                  <EmptyData />
                ) : (
                  <InfiniteScroll
                    dataLength={notificationList.length}
                    next={fetchMoreData}
                    hasMore={
                      Math.ceil(pagination.total / pagination.limit) !== pagination.page - 1 &&
                      notificationList.length !== 0
                    }
                    height="400px"
                    loader={<h4>Loading...</h4>}
                  >
                    {notificationList.map((notification) => {
                      const noti = notiList.find((noti: any) => noti.type === notification.type);
                      if (!noti) return;
                      return (
                        <Box onClick={() => noti.onClick(notification)} key={notification._id}>
                          <NotificationCard sender={notification.senderId} time={notification.createdAt}>
                            <Typography variant="regular2">{noti.message(notification)}</Typography>
                          </NotificationCard>
                        </Box>
                      );
                    })}
                  </InfiniteScroll>
                )}
              </Box>
              {notificationList.length !== 0 && (
                <Box textAlign="center" mt={4}>
                  <Button variant="contained" onClick={handleClickDeleteAll}>
                    Read all
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default NotificationFeature;
