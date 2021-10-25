import { Box } from '@mui/system';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Profile from './pages/Profile';
import Security from './pages/Security';

const UserFeature: React.FC = () => {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Box minHeight="calc(100vh - 145px)">
        <Switch>
          <Route exact path={`${match.url}/general`} component={Profile} />
          <Route exact path={`${match.url}/security`} component={Security} />
          <Route component={NotFound} />
        </Switch>
      </Box>
      <Footer />
    </>
  );
};

export default UserFeature;
