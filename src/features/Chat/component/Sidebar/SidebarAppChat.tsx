import React, { useEffect, useState } from 'react';
import { Box, Button, Slide, Typography } from '@material-ui/core';
import SidebarAppChatStyle from './SidebarAppChatStyle';
import ListRooms from '../ListRooms/ListRooms';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import SidebarAppChatFooter from '../SidebarFooter/SidebarAppChatFooter';
import boardApi from 'api/boardApi';
import { IBoard } from 'models/board';

interface IChannel {
  lstChannel: Array<IBoard>;
}

const SidebarAppChat: React.FC = () => {
  const [hideStatus, setHideStatus] = useState(true);
  const [idChanel, setIdChanel] = useState('0');
  const [chanel, setChanel] = useState<IChannel>({ lstChannel: [] });
  const style = SidebarAppChatStyle();

  useEffect(() => {
    boardApi.getAll().then((data) => {
      setChanel({ lstChannel: data.data.boards });
    });
  }, []);

  useEffect(() => {
    console.log(chanel.lstChannel);
  }, [chanel]);

  const getAvatar = (name: string) => {
    let lstName = name.split(' ');
    return lstName.length > 1 ? lstName[0][0] + lstName[1][0] : lstName[0][0];
  };

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    let chanel = e.currentTarget;
    setIdChanel((chanel as HTMLInputElement).value);
    setHideStatus(!hideStatus);
  };
  return (
    <React.Fragment>
      <div className={style.sidebar}>
        <Slide direction="right" timeout={{ enter: 500, exit: 300 }} in={hideStatus} unmountOnExit mountOnEnter>
          <Box>
            <Button variant="contained" className={style.backButton}>
              Chanels List
            </Button>
            <div className={style.searchField}>
              <SearchIcon className={style.searchIcon}></SearchIcon>
              <input type="text" placeholder="Search" className={style.searchInput}></input>
            </div>
            <div className={style.listChanels}>
              {chanel.lstChannel.map((i) => (
                <Button
                  key={i._id}
                  value={i._id}
                  variant="contained"
                  className={style.chanelLink}
                  onClick={clickHandler}
                >
                  <Typography variant="subtitle1" className={style.avatar}>
                    {getAvatar(i.title)}
                  </Typography>
                  {i.title}
                </Button>
              ))}
            </div>
          </Box>
        </Slide>
        <Slide direction="left" timeout={{ enter: 300, exit: 0 }} in={!hideStatus} unmountOnExit mountOnEnter>
          <Box>
            <Button
              variant="contained"
              className={style.backButton}
              onClick={() => setHideStatus(!hideStatus)}
              startIcon={<ArrowBackIosIcon></ArrowBackIosIcon>}
            >
              All Chanels
            </Button>
            <ListRooms idChanel={idChanel} />
          </Box>
        </Slide>
      </div>
      <SidebarAppChatFooter />
    </React.Fragment>
  );
};

export default SidebarAppChat;
