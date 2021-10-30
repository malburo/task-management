import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, Popover, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import memberApi from 'api/memberApi';
import searchApi from 'api/searchApi';
import InputBaseField from 'components/form-control/InputBaseField';
import { IParams } from 'models/common';
import { IUser } from 'models/user';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';

interface FormValues {
  search: string;
}
interface Params {
  boardId: string;
}
const AssignTask: React.FC = () => {
  const { boardId } = useParams<Params>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [users, setUsers] = useState<IUser[] | []>([]);
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
    const { data } = await searchApi.searchNewMembers(boardId, params);
    setUsers(data.users);
  };
  const handleInviteClick = async (userId: string) => {
    await memberApi.create({ userId, boardId });
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
          {users.length > 0 &&
            users.map((user) => (
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
                <Avatar variant="rounded" src={user.profilePictureUrl} />
                <Box marginX="12px">
                  <Typography>{user.username}</Typography>
                </Box>
                <Button onClick={() => handleInviteClick(user._id)} variant="contained" color="primary">
                  Invite
                </Button>
              </Box>
            ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default AssignTask;