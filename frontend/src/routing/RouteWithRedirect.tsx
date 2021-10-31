import React from 'react';
import {
  RouteProps,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';

export type RouteWithRedirectProps = {
  shouldRedirect: boolean;
  redirectPath: string;
} & RouteProps;

const RouteWithRedirect = ({
  shouldRedirect,
  redirectPath,
  component: Component,
  ...routeProps
}: RouteWithRedirectProps): JSX.Element => {
  if (!Component) {
    throw Error('Component is undefined');
  }

  const render = (props: RouteComponentProps): React.ReactNode => {
    if (shouldRedirect) {
      return <Redirect to={{ pathname: redirectPath }} />;
    }
    return <Component {...props} />;
  };

  return <Route {...routeProps} render={render} />;
};

export default RouteWithRedirect;
