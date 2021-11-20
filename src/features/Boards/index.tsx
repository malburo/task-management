import { socketClient } from 'api/socketClient';
import { AppDispatch } from 'app/store';
import Chat from 'features/Chat/pages/Chat';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { getOneBoard } from './boardSlice';
import BoardDetail from './pages/BoardDetail';
import DashBoard from './pages/DashBoard';
import Members from './pages/Members';

interface IParams {
  boardId: string;
}

const BoardFeature: React.FC = () => {
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
    <>
      <Header />
      <Switch>
        <Route path={`/boards/:boardId/rooms/:roomId`} component={Chat} />
        <Route exact path={`/boards/:boardId`} component={BoardDetail} />
        <Route exact path={`/boards/:boardId/dashboard`} component={DashBoard} />
        <Route exact path={`/boards/:boardId/members`} component={Members} />
        <Route exact path={`/boards/:boardId/members/:memberId`} component={Members} />
        <Route exact path={`/boards/:boardId/tasks/:taskId`} component={BoardDetail} />
      </Switch>
    </>
  );
};

export default BoardFeature;
