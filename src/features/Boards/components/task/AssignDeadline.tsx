import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DateTimePicker, LoadingButton, LocalizationProvider, StaticDateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box, Button, Popover, TextField } from '@mui/material';
import taskApi from 'api/taskApi';
import { useState } from 'react';
import { useParams } from 'react-router';

interface Props {
  value: Date;
}

interface Params {
  boardId: string;
  taskId: string;
}

const AssignDeadline: React.FC<Props> = ({ value }) => {
  const { boardId, taskId } = useParams<Params>();
  const [dateTimeValue, setDateTimeValue] = useState<Date | null>(value ? new Date(value) : new Date());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'date-time-popover' : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSubmit = async () => {
    if (!dateTimeValue) return;
    const payload = { boardId, taskId, data: { deadlineDay: dateTimeValue } };
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateTimePicker
            ampm={false}
            ampmInClock={false}
            displayStaticWrapperAs="desktop"
            value={dateTimeValue}
            onChange={(newValue) => {
              setDateTimeValue(newValue);
            }}
            renderInput={(params) => <div />}
          />
          <Box textAlign="center" marginY="24px">
            <Box paddingX="24px" marginBottom="24px">
              <DateTimePicker
                inputFormat="dd/MM/yyyy H:mm"
                renderInput={(params) => <TextField inputProps={params.inputProps} error={params.error} fullWidth />}
                value={dateTimeValue}
                onChange={(newValue) => {
                  setDateTimeValue(newValue);
                }}
              />
            </Box>
            <LoadingButton variant="contained" color="inherit" sx={{ marginRight: '12px' }} onClick={handleClose}>
              Cancel
            </LoadingButton>
            <LoadingButton variant="contained" color="primary" onClick={onSubmit}>
              Save
            </LoadingButton>
          </Box>
        </LocalizationProvider>
      </Popover>
    </Box>
  );
};
export default AssignDeadline;
