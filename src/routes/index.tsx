import NotFound from 'components/NotFound';
import AuthFeature from 'features/Auth';
import BoardFeature from 'features/Boards';
import ChatFeature from 'features/Chat/ChatApp';
import UserFeature from 'features/User';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';

const RoutesComponent = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute path="/auth" component={AuthFeature} />
      <PrivateRoute path="/boards" component={BoardFeature} />
      <PrivateRoute path="/profile" component={UserFeature} />
      <PrivateRoute path="/chat" component={ChatFeature} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default RoutesComponent;
