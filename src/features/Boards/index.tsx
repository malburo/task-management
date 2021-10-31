import Chat from 'features/Chat/pages/Chat/Chat';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import BoardDetail from './pages/BoardDetail';
import Boards from './pages/Boards';

const BoardFeature: React.FC = () => {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={`${match.url}`} component={Boards} />
        <Route exact path={`${match.url}/:boardId/rooms/:roomId`} component={Chat} />
        <Route exact path={`${match.url}/:boardId`} component={BoardDetail} />
        <Route exact path={`${match.url}/:boardId/tasks/:taskId`} component={BoardDetail} />
      </Switch>
    </>
  );
};

export default BoardFeature;
