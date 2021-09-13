import NotFound from 'components/NotFound';
import AuthFeature from 'features/Auth';
import BoardFeature from 'features/Boards';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const RoutesComponent = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path="/auth" component={AuthFeature} />
      <PrivateRoute path="/boards" component={BoardFeature} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default RoutesComponent;
