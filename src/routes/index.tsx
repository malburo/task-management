import NotFound from 'components/NotFound';
import AuthFeature from 'features/Auth';
import BoardFeature from 'features/Boards';
import Boards from 'features/Boards/pages/Boards';
import LandingPage from 'features/LandingPage';
import UserFeature from 'features/User';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const RoutesComponent = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute path="/auth" component={AuthFeature} />
      <PublicRoute exact path="/" component={LandingPage} />
      <PrivateRoute exact path="/boards" component={Boards} />
      <PrivateRoute path="/boards/:boardId" component={BoardFeature} />
      <PrivateRoute path="/profile" component={UserFeature} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default RoutesComponent;
