import { Menu, MenuItem, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import SidebarAppChatFooterStyle from './SidebarAppChatFooterStyle';

const SidebarAppChatFooter: React.FC = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const style = SidebarAppChatFooterStyle();

  const openProfileOptionHanlder = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  const closeProfileOptionHandler = () => {
    setAnchor(null);
  };

  return (
    <React.Fragment>
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
        <Typography variant="body1" className={style.username}>
          Usernamehere
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
        <MenuItem className={style.profileLogOutOptionItem}>
          <ExitToAppIcon className={style.profileOptionIcon} />
          Log Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
export default SidebarAppChatFooter;
