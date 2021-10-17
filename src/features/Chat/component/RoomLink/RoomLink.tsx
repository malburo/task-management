import { Typography } from '@mui/material';
import { IRoom } from 'models/room';
import React from 'react';
import RoomLinkStyle from './RoomLinkStyle';
import Box from '@mui/material/Box';

interface IRoomLinkPros {
  roomInfor: IRoom;
  hightlight: Boolean;
  isOnline: Boolean;
  newMessage: Number;
}

const RoomLink: React.FC<IRoomLinkPros> = ({ roomInfor, hightlight, isOnline, newMessage }) => {
  const style = RoomLinkStyle();
  return (
    <div className={`${hightlight ? style.roomLinkHightLight : style.roomLink} ${isOnline ? style.online : ''}`}>
      <img alt="none" className={style.avatarImg} src={roomInfor.image}></img>
      <Box
        sx={{
          '&:before': {
            //content: `'${newMessage}'`,
            position: 'absolute',
            display: `${newMessage ? 'flex' : 'none'}`,
            justifyContent: 'center',
            transform: 'translate(100px, 15px)',
          },
        }}
        className={style.roomName}
      >
        <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden !important', textOverflow: 'ellipsis' }}>
          {roomInfor.name}
        </Typography>
        <Typography
          sx={{
            display: `${newMessage > 0 ? 'block' : 'none'}`,
            fontWeight: '600',
            lineHeight: '30px',
          }}
          className={style.newMessage}
        >
          {newMessage > 0 && `${newMessage > 5 ? '5+' : newMessage}`}
        </Typography>
      </Box>
    </div>
  );
};

export default RoomLink;
