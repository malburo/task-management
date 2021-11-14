import { Stack, Box, Typography, Hidden, SwipeableDrawer, Button } from '@mui/material';
import { AppDispatch, RootState } from 'app/store';
import SideBar from 'components/SideBar';
import SidebarAppChat from 'features/Chat/component/Sidebar';
import { getGeneralRoom, getOneRoom } from 'features/Chat/ReduxSlice/RoomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import useChat from 'hooks/useChat';
import MessageBox from 'features/Chat/component/MessageBox';
import chatPageStyles from './style';
import SendMessageForm from 'features/Chat/component/SendMessageForm';
import theme from 'theme';
import { useState } from 'react';
import { setIsOpenMenu } from 'features/Chat/ReduxSlice/uiSlice';
import AccessDeny from 'images/access_deny.png';
import roomApi from 'api/roomApi';

interface IParams {
  boardId: string;
  roomId: string;
}

export default function Chat() {
  const style = chatPageStyles(theme);
  const openMenu = useSelector((state: RootState) => state.chatUI.isOpenMenu);
  const dispatch = useDispatch<AppDispatch>();
  const [isMember, setIsMember] = useState<boolean>(false);
  const room = useSelector((state: RootState) => state.room.roomInfor);
  const { roomId, boardId } = useParams<IParams>();
  useChat();

  useEffect(() => {
    roomApi.getAllYourRoomInBoard(boardId).then((res) => {
      if (res.data.rooms.length > 0) setIsMember(true);
      else {
        setIsMember(false);
        return;
      }
      if (roomId !== 'all') dispatch(getOneRoom(roomId));
      else dispatch(getGeneralRoom(boardId));
    });
  }, [roomId, boardId]);

  const setOpenMenu = () => {
    dispatch(setIsOpenMenu(true));
  };

  const setCloseMenu = () => {
    dispatch(setIsOpenMenu(false));
  };

  return (
    <Stack direction="row">
      <SideBar />
      {!isMember && (
        <Box className={style.surface} height="100vh" bgcolor="#fff" flex={1} overflow="hidden">
          <Box className={style.accessDeny}>
            <img src={AccessDeny} alt="" style={{ width: '40%', marginBottom: '20px' }} />
            <Typography variant="bold6" color="#afafaf">
              You must be a member of project to use this feature
            </Typography>
          </Box>
        </Box>
      )}
      {isMember && (
        <Box className={style.surface} height="100vh" bgcolor="#fff" flex={1} overflow="hidden">
          <Hidden smDown>
            <Box className={style.chatAppSidebar}>
              <SidebarAppChat />
            </Box>
          </Hidden>
          <Box className={style.chatBox} sx={{ position: 'relative' }}>
            <Hidden smUp>
              <SwipeableDrawer
                onClose={setCloseMenu}
                onOpen={setOpenMenu}
                open={openMenu}
                variant="persistent"
                PaperProps={{
                  style: { position: 'absolute', width: '100%' },
                }}
              >
                <SidebarAppChat />
              </SwipeableDrawer>
            </Hidden>
            <Box className={style.chatBoxHeader}>
              <Hidden smUp>
                <Button onClick={setOpenMenu}>+</Button>
              </Hidden>
              <Typography variant="bold5">{room.name}</Typography>
            </Box>
            <Box className={style.messagesField}>
              <MessageBox />
            </Box>
            <Box className={style.sendMessageField}>
              <SendMessageForm />
            </Box>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
