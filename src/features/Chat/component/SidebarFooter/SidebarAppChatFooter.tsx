import { Menu, MenuItem, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SidebarAppChatFooterStyle from './SidebarAppChatFooterStyle';
import { Box } from '@material-ui/system';
import authApi, { GetMeResponse } from 'api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { IUser } from 'models/user';
const SidebarAppChatFooter: React.FC = () => {
  //const currentUser = useSelector((state: RootState) => state.auth );
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [me, setMe] = useState<IUser>();
  const style = SidebarAppChatFooterStyle();

  useEffect(() => {
    (async () => {
      let res = await authApi.getMe();
      setMe(res.data.currentUser.currentUser);
    })();
  }, []);
  const openProfileOptionHanlder = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  const closeProfileOptionHandler = () => {
    setAnchor(null);
  };

  return (
    <Box className={style.footerLayout}>
      <Button
        variant="contained"
        className={style.profileButton}
        onClick={openProfileOptionHanlder}
        endIcon={<ExpandMoreIcon />}
      >
        <img
          alt="none"
          className={style.avatarImg}
          src="https://znews-photo.zadn.vn/w660/Uploaded/ngogtn/2021_04_25/avatar_movie_Cropped.jpg"
        ></img>
        <Typography variant="body1" className={style.username}></Typography>
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
        <MenuItem className={style.profileLogOutOptionItem}>
          <ExitToAppIcon className={style.profileOptionIcon} />
          Log Out
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default SidebarAppChatFooter;
