import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, Popover, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import taskApi from 'api/taskApi';
import { RootState } from 'app/store';
import InputBaseField from 'components/form-control/InputBaseField';
import { membersSelector } from 'features/Boards/boardSlice';
import { IParams } from 'models/common';
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
  const members: IUser[] = useSelector((state: RootState) =>
    membersSelector.selectAll(state).filter((member: IUser) => !task.membersId.includes(member._id))
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = async ({ search }: FormValues) => {
    const params: IParams = { limit: '5', page: '0', q: search };
  };
  const onClickAssignTask = async (memberId: string) => {
    await taskApi.pushMember({ boardId, taskId, memberId });
    setAnchorEl(null);
  };
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
            <Typography variant="bold2">Invite to Board</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Search users you want to invite.</Typography>
          </Box>
          <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputBaseField
                form={form}
                name="search"
                placeholder="Keyword..."
                endAdornment={
                  <IconButton color="primary">
                    <SearchIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                }
              />
            </form>
          </Box>
          {members.length > 0 &&
            members.map((member) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="12px"
                border="1px solid #E0E0E0"
                marginY="24px"
                boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
                borderRadius="12px"
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Avatar variant="rounded" src={member.profilePictureUrl} sx={{ marginRight: '12px' }} />
                  <Typography>{member.username}</Typography>
                </Box>
                <IconButton color="primary" onClick={() => onClickAssignTask(member._id)}>
                  <AddIcon sx={{ fontSize: '16px' }} />
                </IconButton>
              </Box>
            ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default AssignTask;
