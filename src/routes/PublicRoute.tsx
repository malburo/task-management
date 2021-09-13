import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
  component: any;
  layout?: any;
}
const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, layout: Layout, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
