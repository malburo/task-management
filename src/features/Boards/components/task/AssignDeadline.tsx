import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DateTimePicker, LoadingButton, LocalizationProvider, StaticDateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box, Button, Popover, TextField, Typography } from '@mui/material';
import taskApi from 'api/taskApi';
import { useState } from 'react';
import { useParams } from 'react-router';
import Reminder from './Reminder';

interface Props {
  deadline: Date | null;
  remind: Date | null;
}

interface Params {
  boardId: string;
  taskId: string;
}

const AssignDeadline: React.FC<Props> = ({ deadline, remind }) => {
  const { boardId, taskId } = useParams<Params>();
  const [deadlineTime, setDeadlineTime] = useState<Date | null>(deadline ? new Date(deadline) : new Date());
  const [remindTime, setRemindTime] = useState<Date | null>(remind ? new Date(remind) : null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'date-time-popover' : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeadlineTimeChange = (newValue: Date | null) => {
    setDeadlineTime(newValue);
  };
  const handleRemindTimeChange = (newValue: Date | null) => {
    setRemindTime(newValue);
  };
  const onSubmit = async () => {
    if (!deadlineTime) return;
    const payload = {
      boardId,
      taskId,
      data: { deadlineDay: deadlineTime, reminderDay: remindTime, status: 'DOING' },
    };
    await taskApi.update(payload);
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        startIcon={<AccessTimeIcon />}
        fullWidth
        sx={{ justifyContent: 'flex-start', marginTop: '12px' }}
      >
        Time
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          marginTop: '-20px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateTimePicker
            ampm={false}
            ampmInClock={false}
            displayStaticWrapperAs="desktop"
            value={deadlineTime}
            onChange={handleDeadlineTimeChange}
            renderInput={(params) => <div />}
          />
          <Box marginY="24px">
            <Box paddingX="24px" marginBottom="24px">
              <Box marginBottom="8px">
                <Typography variant="regular2">Time</Typography>
              </Box>
              <DateTimePicker
                inputFormat="dd/MM/yyyy H:mm"
                renderInput={(params) => <TextField inputProps={params.inputProps} error={params.error} fullWidth />}
                value={deadlineTime}
                onChange={handleDeadlineTimeChange}
              />
              <Reminder
                remindTime={remindTime}
                deadlineTime={deadlineTime}
                handleRemindTimeChange={handleRemindTimeChange}
              />
            </Box>
            <Box textAlign="center" marginTop="24px">
              <LoadingButton variant="contained" color="inherit" sx={{ marginRight: '12px' }} onClick={handleClose}>
                Cancel
              </LoadingButton>
              <LoadingButton variant="contained" color="primary" onClick={onSubmit}>
                Save
              </LoadingButton>
            </Box>
          </Box>
        </LocalizationProvider>
      </Popover>
    </Box>
  );
};
export default AssignDeadline;
