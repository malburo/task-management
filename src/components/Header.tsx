import { Avatar, Box, Button, Divider, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ViewListIcon from '@mui/icons-material/ViewList';
import { AppDispatch } from 'app/store';
import { logout } from 'features/Auth/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Search from './Search';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth/login');
    setAnchorEl(null);
  };
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Stack direction="row" alignItems="center">
          {/* <img src={Logo} alt="logo" /> */}
          <Typography variant="semiBold5" sx={{ marginX: 3, display: { xs: 'none', md: 'block' } }}>
            Bullo
          </Typography>
          <Typography variant="regular5" sx={{ marginX: 3, display: { xs: 'none', md: 'block' } }}>
            Malburo Board
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<ViewListIcon />}
            onClick={() => history.push('/boards')}
          >
            All Boards
          </Button>
        </Stack>
        <Typography variant="regular5" sx={{ marginX: 3, display: { xs: 'block', md: 'none' } }}>
          Malburo Board
        </Typography>
        <Stack direction="row">
          <Box sx={{ marginRight: 3, display: { xs: 'none', md: 'block' } }}>
            <Search />
          </Box>
          <Avatar
            variant="rounded"
            onClick={handleProfileMenuOpen}
            src="https://avatars3.githubusercontent.com/u/22362391?v=4"
          />
        </Stack>
      </Toolbar>
      <Menu
        id="navbar"
        disableAutoFocusItem
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          marginTop: '12px',
        }}
      >
        <MenuItem onClick={handleClose}>
          <AccountCircleIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular2">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <AppsIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular2"> All boards</Typography>
        </MenuItem>
        <Divider style={{ margin: '10px 0px' }} />
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon fontSize="small" sx={{ fill: '#e35555fa' }} />
          <Typography variant="regular2" sx={{ color: '#e35555fa' }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
