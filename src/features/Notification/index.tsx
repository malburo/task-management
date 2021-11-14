import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, IconButton, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import NotificationCard from './components/NotificationCard';

const NotificationFeature: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

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
            <Box display="flex" alignItems="center">
              <Avatar sx={{ marginRight: '12px' }} />
              <Typography variant="regular2">Board name</Typography>
            </Box>
            <Box padding="12px">
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default NotificationFeature;
