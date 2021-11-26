import LockIcon from '@mui/icons-material/Lock';
import { Button, Grid, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import PublicIcon from '@mui/icons-material/Public';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { updateBoard } from 'features/Boards/boardSlice';
import boardApi from 'api/boardApi';
import { useParams } from 'react-router';

interface Params {
  boardId: string;
}

const EditVisibility = () => {
  const { boardId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isPrivate } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClickPublic = async () => {
    await dispatch(updateBoard({ changes: { isPrivate: false } }));
    await boardApi.update({ boardId, data: { isPrivate: false } });
    setAnchorEl(null);
  };
  const handleClickPrivate = async () => {
    await dispatch(updateBoard({ changes: { isPrivate: true } }));
    await boardApi.update({ boardId, data: { isPrivate: true } });
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        color="inherit"
        startIcon={isPrivate ? <LockIcon /> : <PublicIcon />}
        style={{ marginRight: '16px' }}
      >
        {isPrivate ? 'Private' : 'Public'}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          marginTop: '12px',
          marginLeft: '8px',
        }}
      >
        <Box
          sx={{
            padding: '16px',
          }}
        >
          <Box>
            <Typography variant="bold2">Visibility</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Choose who can see to this board.</Typography>
          </Box>
          <Box
            sx={{
              padding: '12px',
              bgcolor: `${!isPrivate && '#F2F2F2'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#F2F2F2',
              },
            }}
            onClick={handleClickPublic}
          >
            <Grid container alignItems="center">
              <PublicIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">Public</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
          <Box
            sx={{
              padding: '12px',
              cursor: 'pointer',
              bgcolor: `${isPrivate && '#F2F2F2'}`,
              borderRadius: '8px',
              marginTop: '12px',
              ':hover': {
                backgroundColor: '#F2F2F2',
              },
            }}
            onClick={handleClickPrivate}
          >
            <Grid container alignItems="center">
              <LockIcon
                sx={{
                  width: '12px',
                  height: '12px',
                  marginRight: '8px',
                }}
              />
              <Typography variant="regular2">Private</Typography>
            </Grid>
            <Typography variant="regular1">Only board members can see this.</Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default EditVisibility;
