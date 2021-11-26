import { Box, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { subDays, subHours } from 'date-fns';
import React from 'react';
import { useState } from 'react';

interface Props {
  remindTime: Date | null;
  deadlineTime: Date | null;
  handleRemindTimeChange: (remindTime: Date | null) => void;
}

const Reminder: React.FC<Props> = ({ remindTime, deadlineTime, handleRemindTimeChange }) => {
  const [date, setDate] = useState<string>('3');

  const handleChange = (event: SelectChangeEvent) => {
    if (!deadlineTime) return;

    if (event.target.value === '0') {
      setDate(event.target.value);
      handleRemindTimeChange(null);
    }
    if (event.target.value === '1') {
      setDate(event.target.value);
      const newRemindTime = subHours(new Date(deadlineTime), 1);
      handleRemindTimeChange(newRemindTime);
    }
    if (event.target.value === '2') {
      setDate(event.target.value);
      const newRemindTime = subHours(new Date(deadlineTime), 2);
      handleRemindTimeChange(newRemindTime);
    }
    if (event.target.value === '3') {
      setDate(event.target.value);
      const newRemindTime = subDays(new Date(deadlineTime), 1);
      handleRemindTimeChange(newRemindTime);
    }
    if (event.target.value === '4') {
      setDate(event.target.value);
      const newRemindTime = subDays(new Date(deadlineTime), 2);
      handleRemindTimeChange(newRemindTime);
    }
  };
  return (
    <Box>
      <Box marginY="8px">
        <Typography variant="regular2">Reminder</Typography>
      </Box>
      <FormControl fullWidth>
        <Select labelId="reminder-label" id="reminder" value={date} onChange={handleChange} fullWidth>
          <MenuItem value={'0'} sx={{ width: '100%' }}>
            None
          </MenuItem>
          <MenuItem value={'1'} sx={{ width: '100%' }}>
            before 1 hour
          </MenuItem>
          <MenuItem value={'2'} sx={{ width: '100%' }}>
            before 2 hour
          </MenuItem>
          <MenuItem value={'3'} sx={{ width: '100%' }}>
            before 1 day
          </MenuItem>
          <MenuItem value={'4'} sx={{ width: '100%' }}>
            before 2 day
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Reminder;
