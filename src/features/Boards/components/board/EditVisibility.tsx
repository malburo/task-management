import LockIcon from '@mui/icons-material/Lock';
import { Button, Grid, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const EditVisibility: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClickPublic = () => {
    setAnchorEl(null);
  };
  const handleClickPrivate = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        color="inherit"
        startIcon={<LockIcon />}
        style={{ marginRight: '16px' }}
      >
        Private
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
          <Box sx={{ padding: '12px', bgcolor: '#F2F2F2', borderRadius: '8px' }}>
            <Grid container alignItems="center">
              <LockIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">Public</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
          <Box sx={{ padding: '12px' }}>
            <Grid container alignItems="center">
              <LockIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">Public</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default EditVisibility;
