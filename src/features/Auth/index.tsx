import Header from 'components/Header';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Login from './pages/Login';
import OAuthLogin from './pages/OAuthLogin';
import Register from './pages/Register';

const AuthFeature: React.FC = () => {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={`${match.url}/login`} component={Login} />
        <Route exact path={`${match.url}/register`} component={Register} />
        <Route exact path={`${match.url}/oauth/:access_token`} component={OAuthLogin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default AuthFeature;
