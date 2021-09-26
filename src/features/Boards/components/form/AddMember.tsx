import { Avatar, Box, Button, Popover, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import memberApi from 'api/memberApi';
import userApi from 'api/userApi';
import { AppDispatch } from 'app/store';
import InputBaseField from 'components/form-control/InputBaseField';
import { addMember } from 'features/Boards/boardSlice';
import { IUser } from 'models/user';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

interface FormValues {
  search: string;
}
interface Params {
  boardId: string;
}
const AddMember: React.FC = () => {
  const { boardId } = useParams<Params>();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<IUser>();
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
    const { data } = await userApi.getAll({ search });
    setUser(data.users[0]);
  };
  const handleInviteClick = async (userId: string) => {
    const { data } = await memberApi.create({ userId, boardId });
    dispatch(addMember({ newMember: data.newMember }));
  };
  return (
    <Box sx={{ marginLeft: '10px' }}>
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
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
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
          <Box boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" borderRadius="12px" marginTop="12px">
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
          {user && (
            <Box>
              <Avatar variant="rounded" src={user.profilePictureUrl} />
              <Typography>{user.fullname}</Typography>
              <Button onClick={() => handleInviteClick(user._id)}>Invite</Button>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default AddMember;
