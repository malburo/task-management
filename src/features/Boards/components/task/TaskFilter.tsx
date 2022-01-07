import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Popover, Typography } from '@mui/material';
import { AppDispatch, RootState } from 'app/store';
import { labelsSelector, updateFilterByLabel, updateFilterByUser } from 'features/Boards/boardSlice';
import { ILabel } from 'models/label';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';

const TaskFilter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);
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
      dispatch(updateFilterByLabel({ labelId: '' }));
      return;
    }
    setSelectedUser('');
    dispatch(updateFilterByUser({ userId: '' }));

    setSelectedLabel(labelId);
    dispatch(updateFilterByLabel({ labelId }));
  };
  const handleClickMyTask = async () => {
    if (!currentUser) return;
    if (currentUser._id === selectedUser) {
      setSelectedUser('');
      dispatch(updateFilterByUser({ userId: '' }));
      return;
    }
    setSelectedLabel('');
    dispatch(updateFilterByLabel({ labelId: '' }));
    setSelectedUser(currentUser._id);
    dispatch(updateFilterByUser({ userId: currentUser._id }));
  };
  return (
    <Box>
      <Button onClick={handleOpen} variant="contained" color="secondary" startIcon={<FilterListIcon />} fullWidth>
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
              <Typography variant="bold2">Filter Task</Typography>
            </Box>
            <Box
              boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
              marginTop="12px"
              borderRadius="8px"
              padding="12px"
              margin="12px 0px"
            >
              <Box>
                <Typography variant="regular2">Users</Typography>
              </Box>
              <Box
                bgcolor="#ccc"
                marginY="4px"
                padding="8px 12px"
                marginRight="4px"
                borderRadius="4px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexGrow={1}
                sx={{ '&:hover': { opacity: 0.8 }, cursor: 'pointer' }}
                onClick={handleClickMyTask}
              >
                <Typography variant="regular2">My Task</Typography>
                {selectedUser === currentUser?._id && <CheckIcon sx={{ color: 'black', fontSize: '16px' }} />}
              </Box>
            </Box>

            <Box
              padding="12px"
              margin="24px 0px 12px 0px"
              boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
              borderRadius="12px"
            >
              <Box>
                <Typography variant="regular2">Labels</Typography>
              </Box>
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
