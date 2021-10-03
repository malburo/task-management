import { Typography } from '@mui/material';
import roomApi from '.././../../../api/roomApi';
import { IRoom } from 'models/room';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomLink from '../RoomLink/RoomLink';
import ListRoomsStyle from './ListRoomsStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from 'features/Chat/ReduxSlice/SidebarAppChatSlice';
import { AppDispatch, RootState } from 'app/store';
import { Box } from '@mui/material';

interface IListRoomsPros {
  idChanel: string;
}

interface IListRoom {
  lstRoom: Array<IRoom>;
}

const ListRooms: React.FC<IListRoomsPros> = ({ idChanel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [privateRooms, setPrivateRooms] = useState<IListRoom>({ lstRoom: [] });
  const [generalRoom, setGeneralRoom] = useState<IRoom>();
  const room = useSelector((state: RootState) => state.room);
  const style = ListRoomsStyle();

  useEffect(() => {
    roomApi.getAllYourRoomInBoard({ boardId: idChanel }).then((res) => {
      setPrivateRooms({ lstRoom: res.data.rooms.filter((i: IRoom) => i.isGeneral === false) });
      setGeneralRoom(res.data.rooms.filter((i: IRoom) => i.isGeneral === true)[0]);
    });
  }, [idChanel]);

  const closeMenu = () => {
    dispatch(setMenuOpen(false));
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          paddingTop: '10px',
          paddingBottom: '20px',
          margin: '20px 7.5% 20px 7.5%',
          borderRadius: '20px',
          backgroundColor: 'rgb(37, 35, 41)',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <Link to={'/appchat/room/' + generalRoom?._id} onClick={closeMenu} className={style.link}>
          <Typography variant="subtitle1" className={style.titleRoom}>
            {generalRoom?.name}
          </Typography>
        </Link>
        <Typography variant="body2" className={style.description}>
          {generalRoom?.board.description}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '20px 7.5% 0 7.5%',
          marginBottom: '2vh',
        }}
      >
        <Typography variant="h6" className={style.title}>
          Members
        </Typography>
      </Box>
      <div className={style.listMember}>
        {privateRooms.lstRoom.map((i) => {
          let hightlight = false;
          let isOnline = false;
          if (i._id == room._id) hightlight = true;
          return (
            <Link key={i._id} to={'/appchat/room/' + i._id} onClick={closeMenu} className={style.link}>
              <RoomLink isOnline={isOnline} hightlight={hightlight} roomInfor={i} />
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ListRooms;
