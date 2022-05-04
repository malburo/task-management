import { Box, Paper, Stack } from '@mui/material';
import { socketClient } from 'api/socketClient';
import { AppDispatch } from 'app/store';
import Header from 'components/Header';
import SideBar from 'components/SideBar';
import { getOneBoard } from 'features/Boards/boardSlice';
import BoardDetail from 'features/Boards/pages/BoardDetail';
import Members from 'features/Boards/pages/Members';
import Chat from 'features/Chat/pages/Chat';
import DashBoard from 'features/Dashboard';
import WhiteBoard from 'features/WhiteBoard/pages/Whiteboard';
import Whiteboards from 'features/WhiteBoard/pages/Whiteboards';
import Workflow from 'features/Workflow/pages/Workflow';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

interface IParams {
  boardId: string;
}

export function BoardLayout() {
  const { boardId } = useParams<IParams>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socketClient.emit('board:join', boardId);
    return () => {
      socketClient.emit('board:leave', boardId);
    };
  }, [boardId]);

  useEffect(() => {
    (async () => {
      await dispatch(getOneBoard({ boardId: boardId }));
    })();
  }, [dispatch, boardId]);
  return (
    <Box>
      <Header />
      <Stack direction="row">
        <SideBar />
        <Box flex={1} overflow="hidden" component={Paper} maxHeight="100vh">
          <Box height="65px" />
          <Paper sx={{ height: 'calc(100vh - 65px)', overflowY: 'auto' }}>
            <Switch>
              <Route exact path={`/boards/:boardId/whiteboards`} component={Whiteboards} />
              <Route exact path={`/boards/:boardId/whiteboards/:whiteboardId`} component={WhiteBoard} />
              <Route exact path={`/boards/:boardId/workflow`} component={Workflow} />
              <Route exact path={`/boards/:boardId/rooms`} component={Chat} />
              <Route exact path={`/boards/:boardId/rooms/:roomId`} component={Chat} />
              <Route exact path={`/boards/:boardId`} component={BoardDetail} />
              <Route exact path={`/boards/:boardId/dashboard`} component={DashBoard} />
              <Route exact path={`/boards/:boardId/members`} component={Members} />
              <Route exact path={`/boards/:boardId/members/:memberId`} component={Members} />
              <Route exact path={`/boards/:boardId/tasks/:taskId`} component={BoardDetail} />
            </Switch>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
