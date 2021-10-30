import { RootState } from 'app/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: any;
  layout?: any;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, layout: Layout, ...rest }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (!isAuth) {
    return <Redirect to="/auth/login" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
