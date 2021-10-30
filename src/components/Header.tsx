import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Button, Divider, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { AppDispatch, RootState } from 'app/store';
import { logout } from 'features/Auth/authSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Logo from '../images/Logo-small.svg';
import Search from './Search';
import ChatIcon from '@mui/icons-material/Chat';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, currentUser } = useSelector((state: RootState) => state.auth);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickProfile = () => {
    setAnchorEl(null);
    history.push('/profile/general');
  };
  const handleClickAllBoard = () => {
    setAnchorEl(null);
    history.push('/boards');
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth/login');
    setAnchorEl(null);
  };
  const gotoChatApp = () => {
    history.push('/appchat');
  };
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        backdropFilter: 'blur(20px)',
        boxShadow: 'rgb(234 238 243) 0px -1px 1px inset',
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        height: '65px',
      }}
    >
      <Toolbar disableGutters>
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <Stack direction="row" alignItems="center">
            <img src={Logo} alt="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }} />
            <Typography variant="semiBold5" sx={{ marginX: 4, display: { xs: 'none', md: 'block' } }}>
              Task Management
            </Typography>
          </Stack>
          <Box display="flex" alignItems="center">
            {isAuth ? (
              <>
                <Search />
                <Avatar variant="rounded" onClick={handleProfileMenuOpen} src={currentUser?.profilePictureUrl} />
              </>
            ) : (
              <>
                <Box marginRight="24px">
                  <NavLink
                    to="/auth/login"
                    activeStyle={{
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography variant="semiBold4" color="black">
                      Login
                    </Typography>
                  </NavLink>
                </Box>
                <Button color="primary" variant="contained">
                  <NavLink
                    to="/auth/register"
                    activeStyle={{
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography variant="semiBold3" color="white">
                      Sign up
                    </Typography>
                  </NavLink>
                </Button>
              </>
            )}
          </Box>
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
        <MenuItem onClick={handleClickProfile}>
          <AccountCircleIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular2">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleClickAllBoard}>
          <AppsIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular2">All boards</Typography>
        </MenuItem>
        <MenuItem onClick={gotoChatApp}>
          <ChatIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          <Typography variant="regular2">Chat</Typography>
        </MenuItem>
        <Divider sx={{ margin: '10px 0px' }} />
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
