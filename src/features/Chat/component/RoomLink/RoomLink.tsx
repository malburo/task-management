import { Typography } from '@mui/material';
import { IRoom } from 'models/room';
import React from 'react';
import RoomLinkStyle from './RoomLinkStyle';
import Box from '@mui/material/Box';

interface IRoomLinkPros {
  roomInfor: IRoom;
  hightlight: Boolean;
  newMessage: Number;
}

const RoomLink: React.FC<IRoomLinkPros> = ({ roomInfor, hightlight, newMessage }) => {
  const style = RoomLinkStyle();
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden' }}
      className={`${hightlight ? style.roomLinkHightLight : style.roomLink} `}
    >
      <Box sx={{ width: '90%', height: '60px', display: 'flex' }}>
        <img
          alt="none"
          className={style.avatarImg}
          src={`${
            roomInfor.image === undefined
              ? `https://avatars.dicebear.com/4.5/api/initials/${roomInfor.name}.svg`
              : roomInfor.image
          }`}
        />
        <Box
          sx={{
            width: '70%',
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
            {roomInfor.name} {roomInfor.isGeneral && '(All)'}
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
      </Box>
    </Box>
  );
};

export default React.memo(RoomLink);
