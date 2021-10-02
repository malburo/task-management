import { Menu, MenuItem, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SidebarAppChatFooterStyle from './SidebarAppChatFooterStyle';
import { Box } from '@material-ui/system';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { IUser } from 'models/user';
import { Redirect, useHistory } from 'react-router';
import { logout } from 'features/Auth/authSlice';
const SidebarAppChatFooter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser) as IUser;
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

  return (
    <Box className={style.footerLayout}>
      <Button
        variant="contained"
        className={style.profileButton}
        onClick={openProfileOptionHanlder}
        endIcon={<ExpandMoreIcon />}
      >
        <img alt="none" className={style.avatarImg} src={currentUser.profilePictureUrl}></img>
        <Typography variant="body1" className={style.username}>
          {currentUser.fullname}
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
        <MenuItem className={style.profileNormalOptionItem}>
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
