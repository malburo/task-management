import { Typography } from '@material-ui/core';
import roomApi from '.././../../../api/roomApi';
import { IRoom } from 'models/room';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomLink from '../RoomLink/RoomLink';
import ListRoomsStyle from './ListRoomsStyle';
import { useDispatch } from 'react-redux';
import { setMenuOpen } from 'features/Chat/ReduxSlice/SidebarAppChatSlice';
import { AppDispatch } from 'app/store';

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
      <div>
        <Link to={'/appchat/room/' + generalRoom?._id} onClick={closeMenu} className={style.link}>
          <Typography variant="subtitle1" className={style.title}>
            {generalRoom?.name}
          </Typography>
        </Link>
        <Typography variant="body2" className={style.description}>
          {generalRoom?.board.description}
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={style.title}>
          Members
        </Typography>
      </div>
      <div className={style.listMember}>
        {privateRooms.lstRoom.map((i) => (
          <Link key={i._id} to={'/appchat/room/' + i._id} onClick={closeMenu} className={style.link}>
            <RoomLink roomInfor={i} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListRooms;
