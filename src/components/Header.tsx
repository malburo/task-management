
import { Avatar, Box, Button, Divider, Stack } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsIcon from '@material-ui/icons/Apps';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewListIcon from '@material-ui/icons/ViewList';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Search from './Search';

const Header = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            All Boards
          </Button>
        </Stack>
        <Typography variant="regular5" sx={{ marginX: 3, display: { xs: 'block', md: 'none' } }}>
          Devchanllenge Board
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
        <MenuItem onClick={handleClose}>
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
