import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, Popover, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import taskApi from 'api/taskApi';
import InputBaseField from 'components/form-control/InputBaseField';
import { membersSelector } from 'features/Boards/boardSlice';
import { ITask } from 'models/task';
import { IUser } from 'models/user';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface FormValues {
  search: string;
}
interface Params {
  boardId: string;
  taskId: string;
}
interface Props {
  task: ITask;
}
const AssignTask: React.FC<Props> = ({ task }) => {
  const { boardId, taskId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const memberList: IUser[] = useSelector(membersSelector.selectAll);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      search: '',
    },
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    form.reset();
  };

  const onClickAssignTask = async (memberId: string) => {
    await taskApi.pushMember({ boardId, taskId, memberId });
  };
  const onClickReAssignTask = async (memberId: string) => {
    await taskApi.pullMember({ boardId, taskId, memberId });
  };
  const handleSearchMember = async ({ search }: FormValues) => {};
  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        color="inherit"
        startIcon={<GroupIcon />}
        fullWidth
        sx={{ justifyContent: 'flex-start', marginTop: '12px' }}
      >
        Member
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
        <Box padding="16px" minHeight="100px">
          <Box>
            <Typography variant="bold2">Members</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Assign members to this card </Typography>
          </Box>
          <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" borderRadius="8px">
            <form onSubmit={form.handleSubmit(handleSearchMember)}>
              <InputBaseField
                form={form}
                name="search"
                placeholder="User..."
                sx={{ fontSize: '14px', padding: '4px 12px' }}
                endAdornment={
                  <IconButton color="primary" type="submit">
                    <SearchIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                }
              />
            </form>
          </Box>
          <Box
            padding="12px"
            margin="24px 0px 12px 0px"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
            borderRadius="12px"
          >
            {memberList
              .filter((member) => member.username.includes(form.getValues('search')))
              .map((member) => (
                <Box display="flex" alignItems="center" justifyContent="space-between" marginY="12px" key={member._id}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Avatar src={member.profilePictureUrl} sx={{ marginRight: '12px' }} />
                    <Typography variant="regular2">{member.username}</Typography>
                  </Box>
                  {task.membersId.includes(member._id) ? (
                    <IconButton
                      onClick={() => onClickReAssignTask(member._id)}
                      sx={{ backgroundColor: '#ff6357', '&:hover': { backgroundColor: '#e5574d' } }}
                    >
                      <RemoveIcon sx={{ fontSize: '16px' }} />
                    </IconButton>
                  ) : (
                    <IconButton color="primary" onClick={() => onClickAssignTask(member._id)}>
                      <AddIcon sx={{ fontSize: '16px' }} />
                    </IconButton>
                  )}
                </Box>
              ))}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default AssignTask;
