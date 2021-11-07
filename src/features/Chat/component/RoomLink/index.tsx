import { Chip, Typography, Stack } from '@mui/material';
import { IRoom } from 'models/room';
import React from 'react';
import Box from '@mui/material/Box';
import _ from 'lodash';
import roomLinkStyles from './style';

interface IRoomLinkPros {
  roomInfor: IRoom;
  hightlight: Boolean;
  newMessage: Number;
}

const RoomLink: React.FC<IRoomLinkPros> = ({ roomInfor, hightlight, newMessage }) => {
  const style = roomLinkStyles();

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
          }}
          className={style.roomName}
        >
          <Stack direction="row" spacing={1}>
            <Typography>{_.truncate(roomInfor.name, { length: 10 })}</Typography>
            {roomInfor.isGeneral && <Chip label="ALL" color="primary" />}
            {newMessage > 0 && <Chip label={newMessage > 0 && `${newMessage > 5 ? '5+' : newMessage}`} color="error" />}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(RoomLink);
