import React, { useRef, useState } from 'react';
import ListRooms from '../ListRooms';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import sidebarAppChatStyle from './style';

const SidebarAppChat: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const style = sidebarAppChatStyle();
  const searchInput = useRef(null);

  const debounceCall = debounce((term) => setTerm(term), 500);

  const submitChange = (e: React.FormEvent<HTMLInputElement>) => {
    let term = e.currentTarget.value;
    debounceCall(term);
  };

  return (
    <React.Fragment>
      <Box>
        <Box className={style.sidebarHeader}>
          <Typography variant="bold6">AppChat</Typography>
        </Box>
        <Box className={style.searchField}>
          <SearchIcon className={style.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            name="term"
            onChange={submitChange}
            className={style.searchInput}
            ref={searchInput}
            autoComplete="off"
            maxLength={20}
          />
        </Box>
        <Box className={style.listChanels}>
          <ListRooms term={term} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SidebarAppChat;
