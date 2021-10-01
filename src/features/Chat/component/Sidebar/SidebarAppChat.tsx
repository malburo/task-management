import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Slide, Typography } from '@material-ui/core';
import SidebarAppChatStyle from './SidebarAppChatStyle';
import ListRooms from '../ListRooms/ListRooms';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import SidebarAppChatFooter from '../SidebarFooter/SidebarAppChatFooter';
import { IBoard } from 'models/board';
import { debounce } from 'lodash';
import roomApi from 'api/roomApi';

interface IChannelList {
  lstChannel: Array<IBoard>;
}

const SidebarAppChat: React.FC = () => {
  const [hideStatus, setHideStatus] = useState(true);
  const [idChanel, setIdChanel] = useState('0');
  const [channels, setChannels] = useState<IChannelList>({ lstChannel: [] });
  const style = SidebarAppChatStyle();
  const searchInput = useRef(null);

  useEffect(() => {
    roomApi.getAllChannel().then((data) => {
      setChannels({ lstChannel: data.data.channels });
    });
  }, []);

  const getAvatar = (name: string) => {
    let lstName = name.split(' ');
    return lstName.length > 1 ? lstName[0][0] + lstName[1][0] : lstName[0][0];
  };

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    let chanel = e.currentTarget;
    setIdChanel((chanel as HTMLInputElement).value);
    setHideStatus(!hideStatus);
  };

  const fetchDataFromSearch = async (term: string) => {
    const res = await roomApi.search({ term: term });
    setChannels({ lstChannel: res.data.channels });
    console.log(term);
  };

  const debounceCall = debounce((term) => fetchDataFromSearch(term), 500);

  const submitChange = (e: React.FormEvent<HTMLInputElement>) => {
    let term = e.currentTarget.value;
    debounceCall(term);
  };

  return (
    <React.Fragment>
      <div className={style.sidebar}>
        <Slide direction="right" timeout={{ enter: 500, exit: 300 }} in={hideStatus} unmountOnExit mountOnEnter>
          <Box>
            <Button variant="contained" className={style.backButton}>
              Channels List
            </Button>
            <div className={style.searchField}>
              <SearchIcon className={style.searchIcon} />
              <input
                type="text"
                placeholder="Search"
                name="term"
                onChange={submitChange}
                className={style.searchInput}
                ref={searchInput}
              ></input>
            </div>
            <div className={style.listChanels}>
              {channels.lstChannel.length > 0 &&
                channels.lstChannel.map((i) => (
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
              All Channels
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
