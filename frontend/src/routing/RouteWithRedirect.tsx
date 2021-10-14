import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

export type RouteWithRedirectProps = {
  shouldRedirect: boolean;
  redirectPath: string;
} & RouteProps;

const RouteWithRedirect = ({
  shouldRedirect,
  redirectPath,
  ...routeProps
}: RouteWithRedirectProps): JSX.Element => {
  if (shouldRedirect) {
    return <Redirect to={{ pathname: redirectPath }} />;
  } else {
    return <Route {...routeProps} />;
  }
};

export default RouteWithRedirect;
