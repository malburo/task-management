import { Typography } from '@material-ui/core';
import roomApi from '.././../../../api/roomApi';
import { IRoom } from 'models/room';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomLink from '../RoomLink/RoomLink';
import ListRoomsStyle from './ListRoomsStyle';

interface IListRoomsPros {
  idChanel: string;
  setMenuState: (active: boolean) => void;
}

interface IListRoom {
  lstRoom: Array<IRoom>;
}

const ListRooms: React.FC<IListRoomsPros> = ({ idChanel, setMenuState }) => {
  const [privateRooms, setPrivateRooms] = useState<IListRoom>({ lstRoom: [] });
  const [generalRoom, setGeneralRoom] = useState<IRoom>();
  const style = ListRoomsStyle();

  useEffect(() => {
    roomApi.getAllYourRoomInBoard({ boardId: idChanel }).then((res) => {
      setPrivateRooms({ lstRoom: res.data.rooms.filter((i: IRoom) => i.isGeneral === false) });
      res.data.rooms.map((item: IRoom) => {
        if (item.isGeneral) setGeneralRoom(item);
        else setPrivateRooms({ lstRoom: [...privateRooms.lstRoom, item] });
      });
    });
  }, []);

  return (
    <React.Fragment>
      <div>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <Typography variant="subtitle1" className={style.title}>
            {generalRoom?.board.title}
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
          <Link key={i._id} to={'/appchat/room/' + i._id} onClick={() => setMenuState(false)} className={style.link}>
            <RoomLink roomInfor={i} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListRooms;
