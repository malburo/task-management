import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Button, Grid, Popover, Typography } from '@mui/material';
import { Box } from '@mui/system';
import taskApi from 'api/taskApi';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useParams } from 'react-router';

interface Props {
  value: Date;
  status: string;
}
interface Params {
  boardId: string;
  taskId: string;
}

const TaskDeadline: React.FC<Props> = ({ value, status }) => {
  const { boardId, taskId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'deadline-popover' : undefined;

  const handleClickUnfinished = async () => {
    const payload = { boardId, taskId, data: { status: 'UNFINISHED' } };
    await taskApi.update(payload);
    setAnchorEl(null);
  };
  const handleClickFinished = async () => {
    const payload = { boardId, taskId, data: { status: 'FINISHED' } };
    await taskApi.update(payload);
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
          backgroundColor: status === 'UNFINISHED' ? '#EB5757' : '#5fb181',
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
        }}
      >
        <Box padding="16px">
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
              <ErrorIcon sx={{ marginRight: '8px', color: '#EB5757' }} />
              <Typography variant="regular2">Unfinished</Typography>
            </Grid>
            <Typography variant="regular1">choose when you haven't finished the task.</Typography>
          </Box>
          <Box
            padding="12px"
            borderRadius="8px"
            bgcolor={`${status === 'FINISHED' && '#F2F2F2'}`}
            onClick={handleClickFinished}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#F2F2F2' } }}
          >
            <Grid container alignItems="center">
              <CheckCircleIcon sx={{ marginRight: '8px', color: '#5fb181' }} />
              <Typography variant="regular2">Finished</Typography>
            </Grid>
            <Typography variant="regular1">Choose when you have finished task.</Typography>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default TaskDeadline;
