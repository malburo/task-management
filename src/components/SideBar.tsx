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
import BrushIcon from '@mui/icons-material/Brush';
import SchemaIcon from '@mui/icons-material/Schema';

interface IParams {
  boardId: string;
}

interface MenuType {
  url: string;
  name: string;
  icon: JSX.Element;
  exact: boolean;
}

export default function SideBar() {
  const { boardId } = useParams<IParams>();
  const history = useHistory();

  const menuList: MenuType[] = [
    {
      url: `/boards/${boardId}/dashboard`,
      name: 'General',
      icon: <InsertChartIcon />,
      exact: false,
    },
    {
      url: `/boards/${boardId}`,
      name: 'Board',
      icon: <DashboardIcon />,
      exact: true,
    },
    {
      url: `/boards/${boardId}/rooms`,
      name: 'Messages',
      icon: <ChatIcon />,
      exact: false,
    },
    {
      url: `/boards/${boardId}/whiteboards`,
      name: 'White Boards',
      icon: <BrushIcon />,
      exact: false,
    },
    {
      url: `/boards/${boardId}/workflow`,
      name: 'Workflow',
      icon: <SchemaIcon />,
      exact: false,
    },
    {
      url: `/boards/${boardId}/members`,
      name: 'Members',
      icon: <GroupIcon />,
      exact: false,
    },
  ];
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingX: {
          xs: '10px',
          md: '24px',
        },
        minWidth: { xs: '60px', md: '200px' },
        width: { xs: '60px', md: '200px' },
        height: '100vh',
        borderRight: '1px solid rgb(135 135 135 / 22%)',
        zIndex: 1000,
        borderRadius: 0,
      }}
    >
      <Stack direction="row" alignItems="center" margin="24px 0px 24px 24px">
        <Box width="32px" height="32px">
          <img src={Logo} alt="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }} />
        </Box>
        <Typography variant="semiBold5" sx={{ marginX: 4, display: { xs: 'none', md: 'block' } }}>
          Tasker
        </Typography>
      </Stack>
      <List>
        {menuList.map((item, index) => (
          <ListItem
            component={NavLink}
            to={item.url}
            exact={item.exact}
            activeStyle={{ fontWeight: 'bold', opacity: 1 }}
            sx={{ padding: '4px 8px', color: 'text.primary', opacity: 0.5 }}
            key={index}
          >
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              padding="12px"
              borderRadius="4px"
              sx={{ '&:hover': { backgroundColor: 'rgb(195 195 195 / 25%)' } }}
            >
              {item.icon}
              <Typography variant="regular3" sx={{ marginLeft: '24px', display: { xs: 'none', md: 'block' } }}>
                {item.name}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
