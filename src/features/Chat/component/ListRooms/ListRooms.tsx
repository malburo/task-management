import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import RoomLink from '../RoomLink/RoomLink';
import ListRoomsStyle from './ListRoomsStyle';

interface IListRoomsPros {
  idChanel: string;
  setMenuState: (active: boolean) => void;
}

const ListRooms: React.FC<IListRoomsPros> = ({ idChanel, setMenuState }) => {
  const style = ListRoomsStyle();

  return (
    <React.Fragment>
      <div>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <Typography variant="subtitle1" className={style.title}>
            {idChanel}
          </Typography>
        </Link>
        <Typography variant="body2" className={style.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam modi hic facilis laudantium voluptate? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quam modi hic facilis laudantium voluptate? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quam modi hic facilis laudantium voluptate? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quam modi hic facilis laudantium voluptate?
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={style.title}>
          Members
        </Typography>
      </div>
      <div className={style.listMember}>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
        <Link to={'/appchat/room/' + idChanel} onClick={() => setMenuState(false)} className={style.link}>
          <RoomLink name={idChanel} avatar="chuaco"></RoomLink>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ListRooms;
