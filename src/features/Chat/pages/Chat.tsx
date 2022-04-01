import { Grid, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { socketClient } from 'api/socketClient';
import SideBar from 'components/SideBar';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Room from '../components/Room';
import RoomList from '../components/RoomList';

interface IParams {
  boardId: string;
  roomId: string;
}

const Chat = () => {
  const { roomId } = useParams<IParams>();

  useEffect(() => {
    socketClient.emit('chat:join', roomId);
    return () => {
      socketClient.emit('chat:leave', roomId);
    };
  }, [roomId]);

  return (
    <Stack direction="row">
      <SideBar />
      <Stack flex={1}>
        <Box height="65px" />
        <Stack direction="row" p={10} bgcolor="#f8f9fa" flex={1}>
          <Box mr={10}>
            <RoomList />
          </Box>
          <Box flex={1}>
            <Room />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Chat;
