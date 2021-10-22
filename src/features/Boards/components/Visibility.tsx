import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Grid, Popover, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

interface VisibilityProps {
  onChange: (value: boolean) => void;
}

const Visibility: React.FC<VisibilityProps> = ({ onChange }) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClickPublic = () => {
    setIsPrivate(false);
    onChange(false);
    setAnchorEl(null);
  };
  const handleClickPrivate = () => {
    setIsPrivate(true);
    onChange(true);
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        color="inherit"
        fullWidth
        startIcon={isPrivate ? <LockIcon /> : <PublicIcon />}
        sx={{ justifyContent: 'flex-start', marginRight: '16px' }}
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
        <Box p={4}>
          <Box>
            <Typography variant="bold2">Visibility</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Choose who can see to this board.</Typography>
          </Box>
          <Box
            p={4}
            borderRadius={2}
            onClick={handleClickPublic}
            sx={{
              ':hover': {
                backgroundColor: '#F2F2F2',
              },
            }}
          >
            <Grid container alignItems="center">
              <PublicIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">Public</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
          <Box
            p={3}
            borderRadius={2}
            onClick={handleClickPrivate}
            sx={{
              ':hover': {
                backgroundColor: '#F2F2F2',
              },
            }}
          >
            <Grid container alignItems="center">
              <LockIcon sx={{ width: '12px', height: '12px', marginRight: '8px' }} />
              <Typography variant="regular2">Private</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Visibility;
