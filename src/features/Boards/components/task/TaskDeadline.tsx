import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Button, Grid, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import React, { useState } from 'react';

interface Props {
  value: Date;
}

const TaskDeadline: React.FC<Props> = ({ value }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [status, setStatus] = useState<'UNFINISHED' | 'FINISHED'>('UNFINISHED');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'deadline-popover' : undefined;

  const handleClickUnfinished = () => {
    setStatus('UNFINISHED');
    setAnchorEl(null);
  };
  const handleClickFinished = () => {
    setStatus('FINISHED');
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        startIcon={<AccessTimeIcon />}
        sx={{
          backgroundColor: status === 'UNFINISHED' ? '#f54a3ecc' : '#5cd061',
          '&:hover': { backgroundColor: status === 'UNFINISHED' ? '#d14137cc' : '#54c059' },
        }}
      >
        {format(new Date(value), 'EEEE dd-MM-yyyy HH:mm')}
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
            <Typography variant="bold2">Deadline</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Choose who can see to this board.</Typography>
          </Box>
          <Box
            padding="12px"
            borderRadius="8px"
            bgcolor={`${status === 'UNFINISHED' && '#F2F2F2'}`}
            marginY="12px"
            onClick={handleClickUnfinished}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#F2F2F2' } }}
          >
            <Grid container alignItems="center">
              <ErrorIcon sx={{ marginRight: '8px' }} />
              <Typography variant="regular2">UnFinished</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
          <Box
            padding="12px"
            borderRadius="8px"
            bgcolor={`${status === 'FINISHED' && '#F2F2F2'}`}
            onClick={handleClickFinished}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#F2F2F2' } }}
          >
            <Grid container alignItems="center">
              <CheckCircleIcon sx={{ marginRight: '8px' }} />
              <Typography variant="regular2">Finished</Typography>
            </Grid>
            <Typography variant="regular1">Anyone on the internet can see this.</Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default TaskDeadline;
