import { Box, Stack } from '@mui/material';
import { AppDispatch } from 'app/store';
import SideBar from 'components/SideBar';
import MessageBox from 'features/Chat/component/MessageBox';
import SendMessageForm from 'features/Chat/component/SendMessageForm/SendMessageForm';
import SidebarAppChat from 'features/Chat/component/Sidebar';
import { getGeneralRoom, getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import useChat from 'hooks/useChat';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import chatPageStyles from './style';

interface IParams {
  boardId: string;
  roomId: string;
}

export default function Chat() {
  const style = chatPageStyles();
  const dispatch = useDispatch<AppDispatch>();

  const { roomId, boardId } = useParams<IParams>();
  const chat = useChat();

  useEffect(() => {
    if (roomId !== 'all') dispatch(getOneRoom(roomId));
    else dispatch(getGeneralRoom(boardId));
  }, [roomId, boardId, dispatch]);

  return (
    <Stack direction="row">
      <SideBar />
      <Box className={style.surface} height="100vh" bgcolor="#fff" flex={1} overflow="hidden">
        <Box className={style.chatAppBox}>
          <SidebarAppChat />
        </Box>
        <Box className={style.chatBox}>
          <MessageBox />
          <Box className={style.sendMessageField}>
            <SendMessageForm />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
