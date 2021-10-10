import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
} & RouteProps;

const ProtectedRoute = ({
  isAuthenticated,
  authenticationPath,
  ...routeProps
}: ProtectedRouteProps): JSX.Element => {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Route {...routeProps} />;
    //return <Redirect to={{ pathname: authenticationPath }} />;
  }
};

export default ProtectedRoute;
