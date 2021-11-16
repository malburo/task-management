import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { List, ListItem, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { useHistory, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Logo from '../images/Logo-small.svg';

interface IParams {
  boardId: string;
}

export default function SideBar() {
  const { boardId } = useParams<IParams>();
  const history = useHistory();
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: '24px',
        width: '200px',
        height: '100vh',
        bgcolor: '#fff',
        zIndex: 999,
      }}
    >
      <Stack direction="row" alignItems="center" margin="24px">
        <img src={Logo} alt="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }} />
        <Typography variant="semiBold5" sx={{ marginX: 4 }}>
          Tasker
        </Typography>
      </Stack>
      <List>
        <ListItem
          component={NavLink}
          to={`/boards/${boardId}/dashboard`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <InsertChartIcon sx={{ marginRight: '24px' }} />
            <Typography variant="regular3">General</Typography>
          </Box>
        </ListItem>
        <ListItem
          component={NavLink}
          exact
          to={`/boards/${boardId}`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <DashboardIcon sx={{ marginRight: '24px' }} />
            <Typography variant="regular3">Board</Typography>
          </Box>
        </ListItem>
        <ListItem
          component={NavLink}
          to={`/boards/${boardId}/rooms/all`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <ChatIcon sx={{ marginRight: '24px' }} />
            <Typography variant="regular3">Messages</Typography>
          </Box>
        </ListItem>
        <ListItem
          component={NavLink}
          to={`/boards/${boardId}/members`}
          activeStyle={{ color: '#454545', fontWeight: 'bold' }}
          sx={{ padding: '4px 8px', color: '#ccc' }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            padding="12px"
            borderRadius="4px"
            sx={{ '&:hover': { backgroundColor: '#ebebeb', color: '#454545' } }}
          >
            <GroupIcon sx={{ marginRight: '24px' }} />
            <Typography variant="regular3">Members</Typography>
          </Box>
        </ListItem>
      </List>
    </Paper>
  );
}
