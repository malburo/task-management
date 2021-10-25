import { Menu, MenuItem, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import SidebarAppChatFooterStyle from './SidebarAppChatFooterStyle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { IUser } from 'models/user';
import { useHistory } from 'react-router';
import { logout } from 'features/Auth/authSlice';
import Box from '@mui/material/Box';
const SidebarAppChatFooter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const style = SidebarAppChatFooterStyle();

  const openProfileOptionHanlder = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  const closeProfileOptionHandler = () => {
    setAnchor(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth/login');
  };

  const handleGotoBoards = () => {
    history.push('/');
  };

  return (
    <Box className={style.footerLayout}>
      <Button
        variant="contained"
        className={style.profileButton}
        onClick={openProfileOptionHanlder}
        endIcon={<ExpandMoreIcon />}
      >
        <img alt="none" className={style.avatarImg} src={currentUser?.profilePictureUrl}></img>
        <Typography
          sx={{
            display: 'inline-block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          variant="body1"
          className={style.username}
        >
          {currentUser?.fullname}
        </Typography>
      </Button>
      <Menu
        id="profile-option"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={closeProfileOptionHandler}
        classes={{ paper: style.profileOptionList }}
      >
        <MenuItem className={style.profileNormalOptionItem}>
          <AccountCircleIcon className={style.profileOptionIcon} />
          My Profile
        </MenuItem>
        <MenuItem className={style.profileNormalOptionItem} onClick={handleGotoBoards}>
          <HomeIcon className={style.profileOptionIcon} />
          Home
        </MenuItem>
        <hr className={style.profileOptionHr} />
        <MenuItem className={style.profileLogOutOptionItem} onClick={handleLogout}>
          <ExitToAppIcon className={style.profileOptionIcon} />
          Log Out
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default SidebarAppChatFooter;
