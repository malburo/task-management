import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Popover, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import memberApi from 'api/memberApi';
import searchApi from 'api/searchApi';
import InputBaseField from 'components/form-control/InputBaseField';
import { IParams } from 'models/common';
import { IUser } from 'models/user';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface FormValues {
  search: string;
}
interface Params {
  boardId: string;
}
const AddMember: React.FC = () => {
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
      <IconButton aria-describedby={id} onClick={handleClick} color="primary">
        <AddIcon />
      </IconButton>

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
        <Box padding="16px" minHeight="100px">
          <Box>
            <Typography variant="bold2">Invite to Board</Typography>
          </Box>
          <Box>
            <Typography variant="regular2">Search users you want to invite.</Typography>
          </Box>
          <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" marginTop="12px" borderRadius="8px">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputBaseField
                form={form}
                name="search"
                placeholder="Keyword..."
                sx={{ fontSize: '14px', padding: '4px 12px' }}
                endAdornment={
                  <IconButton color="primary" type="submit">
                    <SearchIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                }
              />
            </form>
          </Box>
          {users.length > 0 && (
            <Box
              padding="12px"
              margin="24px 0px 12px 0px"
              boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
              borderRadius="12px"
            >
              {users.map((user) => (
                <Box display="flex" alignItems="center" justifyContent="space-between" marginY="12px" key={user._id}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Avatar src={user.profilePictureUrl} sx={{ marginRight: '12px' }} />
                    <Typography variant="regular2">{user.username}</Typography>
                  </Box>
                  <IconButton color="primary" onClick={() => handleInviteClick(user._id)}>
                    <AddIcon sx={{ fontSize: '16px' }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default AddMember;
