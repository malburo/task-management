import { Stack, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AppDispatch } from 'app/store';
import SideBar from 'components/SideBar';
import { getGeneralRoom, getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import SendMessageForm from 'features/Chat/component/SendMessageForm/SendMessageForm';
import useChat from 'hooks/useChat';
import SidebarAppChat from 'features/Chat/component/Sidebar/SidebarAppChat';
import MessageBox from 'features/Chat/component/MessageBox/MessageBox';
import { getOneBoard } from 'features/Boards/boardSlice';
import { socketClient } from 'api/socketClient';

const useStyle = makeStyles({
  chatAppBox: {
    width: '30%',
    height: '90%',
    borderRadius: '20px',
    backgroundColor: '#f8f9fd',
    marginLeft: '2.5%',
    marginTop: '80px',
  },
  chatBox: {
    marginTop: '80px',
    marginLeft: '2.5%',
    backgroundColor: '#f8f9fd',
    height: '90%',
    width: '60%',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  messagesField: {
    height: 'calc(100% - 80px)',
  },
  sendMessageField: {
    height: '80px',
  },
});

interface IParams {
  boardId: string;
  roomId: string;
}

export default function Chat() {
  const style = useStyle();
  const dispatch = useDispatch<AppDispatch>();

  const { roomId, boardId } = useParams<IParams>();
  const chat = useChat();

  useEffect(() => {
    if (roomId !== 'all') dispatch(getOneRoom(roomId));
    else dispatch(getGeneralRoom(boardId));

    dispatch(getOneBoard({ boardId }));
    socketClient.emit('board:join', boardId);

    return () => {
      socketClient.emit('board:leave', boardId);
    };
  }, [roomId, boardId]);

  return (
    <Stack direction="row">
      <SideBar />
      <Box sx={{ display: 'flex', justifyContent: 'column' }} height="100vh" bgcolor="#fff" flex={1} overflow="hidden">
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
