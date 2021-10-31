import React from 'react';
import {
  RouteProps,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { REDIRECT_QUERY_KEY } from './routes';
import queryString from 'query-string';

export type RouteWithRedirectProps = {
  shouldRedirect: boolean;
  redirectPath: string;
  shouldStoreRedirect: boolean;
} & RouteProps;

const RouteWithRedirect = ({
  shouldRedirect,
  redirectPath,
  shouldStoreRedirect,
  component: Component,
  ...routeProps
}: RouteWithRedirectProps): JSX.Element => {
  if (!Component) {
    throw Error('Component is undefined');
  }

  const render = (props: RouteComponentProps): React.ReactNode => {
    if (shouldRedirect) {
      if (shouldStoreRedirect) {
        return (
          <Redirect
            to={{
              pathname: `${redirectPath}?${REDIRECT_QUERY_KEY}=${props.location.pathname}`,
            }}
          />
        );
      }

      const parsedQueries = queryString.parse(location.search);
      const redirectTo = parsedQueries[REDIRECT_QUERY_KEY];
      if (!Array.isArray(redirectTo) && typeof redirectTo === 'string') {
        return <Redirect to={{ pathname: redirectTo }} />;
      }

      return <Redirect to={{ pathname: redirectPath }} />;
    }
    return <Component {...props} />;
  };

  return <Route {...routeProps} render={render} />;
};

export default RouteWithRedirect;
