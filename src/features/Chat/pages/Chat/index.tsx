import { Stack, Box } from '@mui/material';
import { AppDispatch } from 'app/store';
import SideBar from 'components/SideBar';
import { getGeneralRoom, getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import useChat from 'hooks/useChat';
import MessageBox from 'features/Chat/component/MessageBox';
import { getOneBoard } from 'features/Boards/boardSlice';
import { socketClient } from 'api/socketClient';
import SidebarAppChat from 'features/Chat/component/Sidebar';
import chatPageStyles from './style';
import SendMessageForm from 'features/Chat/component/SendMessageForm';

interface IParams {
  boardId: string;
  roomId: string;
}

export default function Chat() {
  const style = chatPageStyles();
  const dispatch = useDispatch<AppDispatch>();

  const { roomId, boardId } = useParams<IParams>();
  // eslint-disable-next-line
  const chat = useChat();

  useEffect(() => {
    if (roomId !== 'all') dispatch(getOneRoom(roomId));
    else dispatch(getGeneralRoom(boardId));

    dispatch(getOneBoard({ boardId }));
    socketClient.emit('board:join', boardId);

    return () => {
      socketClient.emit('board:leave', boardId);
    };
    // eslint-disable-next-line
  }, [roomId, boardId]);

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
