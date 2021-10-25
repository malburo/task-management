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
import useChat from 'hooks/useChat';
import { socketClient } from 'api/socketClient';

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
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const style = ListRoomsStyle();
  const { joinChannel } = useChat();

  useEffect(() => {
    socketClient.on('channel:new-message', (data) => {
      roomApi.getAllYourRoomInBoard({ boardId: idChanel }).then((res) => {
        setPrivateRooms({ lstRoom: res.data.rooms.filter((i: IRoom) => i.isGeneral === false) });
        setGeneralRoom(res.data.rooms.filter((i: IRoom) => i.isGeneral === true)[0]);
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    joinChannel(idChanel);
    roomApi.getAllYourRoomInBoard({ boardId: idChanel }).then((res) => {
      setPrivateRooms({ lstRoom: res.data.rooms.filter((i: IRoom) => i.isGeneral === false) });
      setGeneralRoom(res.data.rooms.filter((i: IRoom) => i.isGeneral === true)[0]);
    });
    // eslint-disable-next-line
  }, [idChanel]);

  const closeMenu = () => {
    dispatch(setMenuOpen(false));
  };

  const resetRoomList = () => {
    roomApi.getAllYourRoomInBoard({ boardId: idChanel }).then((res) => {
      setPrivateRooms({ lstRoom: res.data.rooms.filter((i: IRoom) => i.isGeneral === false) });
      setGeneralRoom(res.data.rooms.filter((i: IRoom) => i.isGeneral === true)[0]);
    });
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          paddingTop: '10px',
          paddingBottom: '20px',
          margin: '20px 7.5% 20px 7.5%',
          borderRadius: '20px',
          backgroundColor: `${generalRoom?._id === room._id ? '#2F80ED' : 'rgb(37, 35, 41)'}`,
        }}
      >
        <Link
          to={'/appchat/room/' + generalRoom?._id}
          onClick={closeMenu}
          className={`${style.link} ${style.generalLink}`}
        >
          <Typography variant="subtitle1" className={style.titleRoom}>
            {generalRoom?.name}
          </Typography>
          <Typography
            sx={{
              backgroundColor: 'red',
              height: '30px',
              color: 'white',
              lineHeight: '30px',
              textAlign: 'center',
              marginLeft: '10px !important',
              width: '30px',
              borderRadius: '50%',
              display: `${generalRoom && generalRoom.newMessage > 0 ? 'block' : 'none'}`,
            }}
          >
            {generalRoom &&
              generalRoom?.newMessage > 0 &&
              `${generalRoom?.newMessage > 5 ? '5+' : generalRoom?.newMessage}`}
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
        <Typography variant="subtitle1" className={style.title}>
          Members
        </Typography>
      </Box>
      <div className={style.listMember}>
        {privateRooms.lstRoom.map((i) => {
          let hightlight = false;
          let isOnline = false;
          if (i._id === room._id) hightlight = true;
          return (
            <Link
              onClickCapture={resetRoomList}
              key={i._id}
              to={'/appchat/room/' + i._id}
              onClick={closeMenu}
              className={style.link}
            >
              <RoomLink isOnline={isOnline} newMessage={i.newMessage} hightlight={hightlight} roomInfor={i} />
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ListRooms;
