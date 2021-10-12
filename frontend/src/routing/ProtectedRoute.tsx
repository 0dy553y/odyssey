import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { LOGIN_ROUTE } from './routes';
import { HOME_ROUTE } from './routes';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

export const ProtectedRoute = ({
  isAuthenticated,
  ...routeProps
}: ProtectedRouteProps): JSX.Element => {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: LOGIN_ROUTE }} />;
  }
};

export const RedirectIfAuthenticated = ({
  isAuthenticated,
  ...routeProps
}: ProtectedRouteProps): JSX.Element => {
  if (isAuthenticated) {
    return <Redirect to={{ pathname: HOME_ROUTE }} />;
  } else {
    return <Route {...routeProps} />;
  }
};
