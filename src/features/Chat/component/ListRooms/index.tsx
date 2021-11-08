import roomApi from '../../../../api/roomApi';
import { IRoom } from 'models/room';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomLink from '../RoomLink';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { Box } from '@mui/material';
import { socketClient } from 'api/socketClient';
import useListRoomStyles from './style';

interface IListRoom {
  term: string;
}

const ListRooms: React.FC<IListRoom> = (props) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const board = useSelector((state: RootState) => state.board);
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const style = useListRoomStyles();

  useEffect(() => {
    socketClient.on('board:new-message', (data) => {
      roomApi.getAllYourRoomInBoard(board._id).then((res) => {
        setRooms(res.data.rooms);
      });
    });

    // eslint-disable-next-line
  }, [board]);

  useEffect(() => {
    roomApi.getAllYourRoomInBoard(board._id).then((res) => {
      setRooms(res.data.rooms);
    });

    // eslint-disable-next-line
  }, [board]);

  useEffect(() => {
    (async () => {
      const res = await roomApi.search({ boardId: board._id, params: { term: props.term } });
      setRooms(res.data.room);
    })();

    // eslint-disable-next-line
  }, [props.term]);

  return (
    <React.Fragment>
      <Box className={style.listMember}>
        {rooms?.map((i) => {
          let hightlight = false;
          if (i._id === room._id) hightlight = true;
          return (
            <Link key={i._id} to={`/boards/${board._id}/rooms/${i._id}`} className={style.link}>
              <RoomLink newMessage={i.newMessage} hightlight={hightlight} roomInfor={i} />
            </Link>
          );
        })}
      </Box>
    </React.Fragment>
  );
};

export default React.memo(ListRooms);
