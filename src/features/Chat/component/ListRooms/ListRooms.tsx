import roomApi from '.././../../../api/roomApi';
import { IRoom } from 'models/room';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomLink from '../RoomLink/RoomLink';
import ListRoomsStyle from './ListRoomsStyle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { Box } from '@mui/material';
import useChat from 'hooks/useChat';
import { socketClient } from 'api/socketClient';
import { useHistory } from 'react-router';

interface IListRoom {
  term: string;
}

const ListRooms: React.FC<IListRoom> = (props) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const board = useSelector((state: RootState) => state.board);
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const style = ListRoomsStyle();

  useEffect(() => {
    socketClient.on('board:new-message', (data) => {
      roomApi.getAllYourRoomInBoard({ boardId: board._id }).then((res) => {
        setRooms(res.data.rooms);
      });
    });
  }, [board]);

  useEffect(() => {
    roomApi.getAllYourRoomInBoard({ boardId: board._id }).then((res) => {
      setRooms(res.data.rooms);
    });
  }, [board]);

  useEffect(() => {
    (async () => {
      const res = await roomApi.search({ boardId: board._id, params: { term: props.term } });
      setRooms(res.data.room);
    })();
  }, [props.term]);

  return (
    <React.Fragment>
      <Box className={style.listMember}>
        {rooms?.map((i) => {
          let hightlight = false;
          if (i._id === room._id) hightlight = true;
          return (
            <Link
              // onClickCapture={resetRoomList}
              key={i._id}
              to={`/boards/${board._id}/rooms/${i._id}`}
              className={style.link}
            >
              <RoomLink newMessage={i.newMessage} hightlight={hightlight} roomInfor={i} />
            </Link>
          );
        })}
      </Box>
    </React.Fragment>
  );
};

export default React.memo(ListRooms);
