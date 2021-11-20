import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Popover, Typography } from '@mui/material';
import { AppDispatch } from 'app/store';
import { labelsSelector, updateFilter } from 'features/Boards/boardSlice';
import { ILabel } from 'models/label';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';

const TaskFilter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const labelList: ILabel[] = useSelector(labelsSelector.selectAll);

  const open = Boolean(anchorEl);
  const id = open ? 'filter-task' : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLabel = async (labelId: string) => {
    if (labelId === selectedLabel) {
      setSelectedLabel('');
      dispatch(updateFilter({ filter: '' }));
      return;
    }
    setSelectedLabel(labelId);
    dispatch(updateFilter({ filter: labelId }));
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<FilterListIcon />} fullWidth>
        Filter
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
        <Box padding="16px" minHeight="100px" width="260px">
          <>
            <Box>
              <Typography variant="bold2">Filter</Typography>
            </Box>
            <Box>
              <Typography variant="regular2">Filter task by label</Typography>
            </Box>
            <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" borderRadius="8px"></Box>
            <Box
              padding="12px"
              margin="24px 0px 12px 0px"
              boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
              borderRadius="12px"
            >
              {labelList.map((label) => (
                <Box display="flex" alignItems="center" justifyContent="space-between" key={label._id}>
                  <Box
                    bgcolor={`${label.color}33`}
                    marginY="4px"
                    padding="8px 12px"
                    marginRight="4px"
                    borderRadius="4px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexGrow={1}
                    sx={{ '&:hover': { opacity: 0.8 }, cursor: 'pointer' }}
                    onClick={() => handleClickLabel(label._id)}
                  >
                    <Typography sx={{ color: label.color }} variant="regular2">
                      {label.name}
                    </Typography>
                    {selectedLabel === label._id && <CheckIcon sx={{ color: 'black', fontSize: '16px' }} />}
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        </Box>
      </Popover>
    </Box>
  );
};

export default TaskFilter;
