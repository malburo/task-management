import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleIcon from '@mui/icons-material/People';
import { Typography, useMediaQuery } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { AppDispatch, RootState } from 'app/store';
import { getGeneralRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import theme from 'theme';

interface IParams {
  boardId: string;
}

export default function SideBar() {
  const history = useHistory();
  const { boardId } = useParams<IParams>();
  const mdMatch = useMediaQuery(theme.breakpoints.up('md'));

  const room = useSelector((state: RootState) => state.room.roomInfor);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getGeneralRoom(boardId));
  }, [boardId]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 24px 24px 24px',
        width: `${mdMatch ? '200px' : 'auto'}`,
        height: 'calc(100vh - 105px)',
        bgcolor: '#f8f9fd',
        zIndex: 999,
      }}
    >
      <MenuList>
        <MenuItem sx={{ width: '100%' }}>
          <InsertChartIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          {mdMatch && <Typography variant="regular3">General</Typography>}
        </MenuItem>
        <MenuItem sx={{ width: '100%' }} onClick={() => history.push(`/boards/${boardId}`)}>
          <DashboardIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          {mdMatch && <Typography variant="regular3">Board</Typography>}
        </MenuItem>
        <MenuItem sx={{ width: '100%' }} onClick={() => history.push(`/boards/${boardId}/rooms/${room._id}`)}>
          <ChatIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          {mdMatch && <Typography variant="regular3">Messages</Typography>}
        </MenuItem>
        <MenuItem sx={{ width: '100%' }}>
          <HistoryIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          {mdMatch && <Typography variant="regular3">Activity</Typography>}
        </MenuItem>
        <MenuItem sx={{ width: '100%' }}>
          <PeopleIcon fontSize="small" sx={{ fill: '#4F4F4F' }} />
          {mdMatch && <Typography variant="regular3">Members</Typography>}
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
