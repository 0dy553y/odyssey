import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route, Switch } from 'react-router-dom';
import { LOGIN_ROUTE, routes } from './routing/routes';
import ProtectedRoute, { ProtectedRouteProps } from './routing/ProtectedRoute';

import './App.css';

function App(): JSX.Element {
  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: true, // TODO: replace this
    authenticationPath: LOGIN_ROUTE,
  };

  return (
    <Container className="App" component="main" maxWidth="xs">
      <CssBaseline />
      <Switch>
        {routes.map((route) => {
          if (!!route.isPublic) {
            return (
              <ProtectedRoute
                key={route.path}
                {...defaultProtectedRouteProps}
                path={route.path}
              >
                {route.component}
              </ProtectedRoute>
            );
          } else {
            return (
              <Route key={route.path} path={route.path}>
                {route.component}
              </Route>
            );
          }
        })}
      </Switch>
    </Container>
  );
}

export default App;
