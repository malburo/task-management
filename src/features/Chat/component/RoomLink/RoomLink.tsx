import { Typography } from '@material-ui/core';
import { IRoom } from 'models/room';
import React from 'react';
import RoomLinkStyle from './RoomLinkStyle';

interface IRoomLinkPros {
  roomInfor: IRoom;
}

const RoomLink: React.FC<IRoomLinkPros> = ({ roomInfor }) => {
  const style = RoomLinkStyle();
  return (
    <div className={style.roomLink}>
      <img alt="none" className={style.avatarImg} src={roomInfor.image}></img>
      <Typography variant="subtitle1" className={style.roomName}>
        {roomInfor.name}
      </Typography>
    </div>
  );
};

export default RoomLink;
