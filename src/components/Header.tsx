import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
import NotificationFeature from 'features/Notification';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { changeMode } from 'themeSlice';
import Logo from '../images/Logo-small.svg';
import Badge from '@mui/material/Badge';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, currentUser } = useSelector((state: RootState) => state.auth);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenuItem = (path: string) => {
    setAnchorEl(null);
    history.push(path);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth/login');
    setAnchorEl(null);
  };
  const toggleColorMode = () => {
    if (mode === 'light') return dispatch(changeMode('dark'));
    dispatch(changeMode('light'));
  };
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        backdropFilter: 'blur(20px)',
        boxShadow: 'rgb(135 135 135 / 22%) 0px -1px 1px inset',
        opacity: '0.92',
        height: '65px',
      }}
    >
      <Toolbar disableGutters>
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <Stack direction="row" alignItems="center">
            <img src={Logo} alt="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }} />
            <Typography variant="semiBold5" sx={{ marginX: 4, display: { xs: 'none', md: 'block' } }}>
              Tasker
            </Typography>
          </Stack>
          <Box display="flex" alignItems="center">
            {isAuth ? (
              <>
                {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Search />
                </Box> */}
                <NotificationFeature />
                <Avatar
                  onClick={handleProfileMenuOpen}
                  src={currentUser?.profilePictureUrl}
                  sx={{ width: '40px', height: '40px' }}
                />
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
        <MenuItem onClick={() => handleClickMenuItem('/profile/general')}>
          <AccountCircleIcon fontSize="small" />
          <Typography variant="regular2">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClickMenuItem('/boards')}>
          <AppsIcon fontSize="small" />
          <Typography variant="regular2">All boards</Typography>
        </MenuItem>
        <Divider sx={{ margin: '10px 0px' }} />
        <MenuItem onClick={toggleColorMode}>
          {mode === 'dark' ? (
            <>
              <Brightness4Icon fontSize="small" />
              <Typography variant="regular2">Dark</Typography>
            </>
          ) : (
            <>
              <Brightness7Icon fontSize="small" />
              <Typography variant="regular2">Light</Typography>
            </>
          )}
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
