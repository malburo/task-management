import React, { useState } from 'react';
import ListRooms from '../ListRooms';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { Box } from '@mui/system';
import { InputAdornment, OutlinedInput, Typography } from '@mui/material';
import sidebarAppChatStyle from './style';

const SidebarAppChat: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const style = sidebarAppChatStyle();

  const debounceCall = debounce((term) => setTerm(term), 500);

  const submitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let term = e.currentTarget.value;
    debounceCall(term);
  };

  return (
    <React.Fragment>
      <Box className={style.surface}>
        <Box className={style.sidebarHeader}>
          <Typography variant="bold6">AppChat</Typography>
        </Box>
        <Box className={style.searchField}>
          <OutlinedInput
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            type="text"
            placeholder="Search"
            name="term"
            onChange={submitChange}
            autoComplete="off"
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
