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
        <Route path={`${match.url}/:boardId`} component={BoardDetail} />
        <Route path={`${match.url}/:boardId/:cardId`} component={BoardDetail} />
      </Switch>
    </>
  );
};

export default BoardFeature;
