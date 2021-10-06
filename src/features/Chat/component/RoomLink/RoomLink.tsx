import { Typography } from '@mui/material';
import { IRoom } from 'models/room';
import React from 'react';
import RoomLinkStyle from './RoomLinkStyle';

interface IRoomLinkPros {
  roomInfor: IRoom;
  hightlight: Boolean;
  isOnline: Boolean;
}

const RoomLink: React.FC<IRoomLinkPros> = ({ roomInfor, hightlight, isOnline }) => {
  const style = RoomLinkStyle();
  return (
    <div className={`${hightlight ? style.roomLinkHightLight : style.roomLink} ${isOnline ? style.online : ''}`}>
      <img alt="none" className={style.avatarImg} src={roomInfor.image}></img>
      <Typography
        sx={{
          display: 'inlineblock',
          whiteSpace: 'nowrap',
          overflow: 'hidden !important',
          textOverflow: 'ellipsis',
        }}
        variant="subtitle1"
        className={style.roomName}
      >
        {roomInfor.name}
      </Typography>
    </div>
  );
};

export default RoomLink;
