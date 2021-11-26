import roomApi from '../../../../api/roomApi';
import { IRoom } from 'models/room';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomLink from '../RoomLink';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { Box } from '@mui/material';
import { socketClient } from 'api/socketClient';
import useListRoomStyles from './style';
import { setIsOpenMenu } from 'features/Chat/ReduxSlice/uiSlice';

interface IListRoom {
  term: string;
}

const ListRooms: React.FC<IListRoom> = (props) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const board = useSelector((state: RootState) => state.board);
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const dispatch = useDispatch<AppDispatch>();
  const style = useListRoomStyles();

  useEffect(() => {
    if (board._id === '') return;
    socketClient.on('board:new-message', (data) => {
      roomApi.getAllYourRoomInBoard(board._id).then((res) => {
        setRooms(res.data.rooms);
      });
    });
    // eslint-disable-next-line
  }, [board._id]);

  useEffect(() => {
    if (board._id === '') return;
    roomApi.getAllYourRoomInBoard(board._id).then((res) => {
      setRooms(res.data.rooms);
    });

    console.log('call by this');
    // eslint-disable-next-line
  }, [board._id, room]);

  useEffect(() => {
    if (board._id === '') return;
    roomApi.search({ boardId: board._id, params: { term: props.term } }).then((res) => {
      setRooms(res.data.room);
    });
    console.log('call by this');
    // eslint-disable-next-line
  }, [props.term]);

  return (
    <React.Fragment>
      <Box className={style.listMember}>
        {rooms?.map((i) => {
          let hightlight = false;
          if (i._id === room._id) hightlight = true;
          return (
            <Link
              key={i._id}
              to={`/boards/${board._id}/rooms/${i._id}`}
              className={style.link}
              onClick={() => dispatch(setIsOpenMenu(false))}
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
