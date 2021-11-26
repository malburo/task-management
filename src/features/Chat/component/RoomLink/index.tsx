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

  const getCoverImage = (): string => {
    if (roomInfor.isGeneral) return roomInfor.board.coverUrl;
    else {
      return roomInfor.image === undefined
        ? `https://avatars.dicebear.com/4.5/api/initials/${roomInfor.name}.svg`
        : roomInfor.image;
    }
  };

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden' }}
      className={`${hightlight ? style.roomLinkHightLight : style.roomLink} `}
    >
      <Box sx={{ width: '100%', height: '60px', display: 'flex' }}>
        <img alt="none" className={style.avatarImg} src={getCoverImage()} />
        <Box
          sx={{
            width: '70%',
          }}
          className={style.roomName}
        >
          <Stack direction="row" spacing={1}>
            <Typography>{_.truncate(roomInfor?.name, { length: roomInfor.isGeneral ? 10 : 20 })}</Typography>
            {roomInfor.isGeneral && <Chip label="ALL" color="warning" />}
            {roomInfor.isBot && <Chip label="BOT" color="primary" />}
            {newMessage > 0 && <Chip label={newMessage > 0 && `${newMessage > 5 ? '5+' : newMessage}`} color="error" />}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(RoomLink);
