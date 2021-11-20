import FilterListIcon from '@mui/icons-material/FilterList';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Grid, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  handleTypeChange: (type: 'myBoards' | 'myBoardsJoined' | 'public') => void;
  type: 'myBoards' | 'myBoardsJoined' | 'public';
}

const BoardFilter: React.FC<Props> = ({ handleTypeChange, type }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'filter-board' : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = async (type: 'myBoards' | 'myBoardsJoined' | 'public') => {
    handleTypeChange(type);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<FilterListIcon />} fullWidth>
        {type === 'myBoards' && 'My Boards'}
        {type === 'myBoardsJoined' && 'Joined'}
        {type === 'public' && 'Public'}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '12px',
        }}
      >
        <Box p={4}>
          <Box>
            <Typography variant="bold2">Board Filter</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Choose who can see to this board.</Typography>
          </Box>
          <Box
            p={4}
            borderRadius={2}
            onClick={() => handleClick('myBoards')}
            sx={{
              ':hover': {
                backgroundColor: '#F2F2F2',
              },
            }}
          >
            <Grid container alignItems="center">
              <LockIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">My Board</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
          <Box
            p={3}
            borderRadius={2}
            onClick={() => handleClick('myBoardsJoined')}
            sx={{
              ':hover': {
                backgroundColor: '#F2F2F2',
              },
            }}
          >
            <Grid container alignItems="center">
              <LockIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">Joined</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
          <Box
            p={3}
            borderRadius={2}
            onClick={() => handleClick('public')}
            sx={{
              ':hover': {
                backgroundColor: '#F2F2F2',
              },
            }}
          >
            <Grid container alignItems="center">
              <LockIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">Community</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default BoardFilter;
