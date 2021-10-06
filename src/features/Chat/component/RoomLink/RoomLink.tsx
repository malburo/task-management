import { Typography } from '@mui/material';
import React from 'react';
import RoomLinkStyle from './RoomLinkStyle';

interface IRoomLinkPros {
  name: string;
  avatar: string;
}

const RoomLink: React.FC<IRoomLinkPros> = ({ name, avatar }) => {
  const style = RoomLinkStyle();
  return (
    <div className={style.roomLink}>
      <img
        alt="none"
        className={style.avatarImg}
        src="https://znews-photo.zadn.vn/w660/Uploaded/ngogtn/2021_04_25/avatar_movie_Cropped.jpg"
      ></img>
      <Typography variant="subtitle1" className={style.roomName}>
        {name}
      </Typography>
    </div>
  );
};

export default RoomLink;
