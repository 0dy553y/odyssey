import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route, Switch } from 'react-router-dom';
import { LOGIN_ROUTE, routes } from './routing/routes';
import ProtectedRoute, { ProtectedRouteProps } from './routing/ProtectedRoute';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { getUser } from './store/auth/selectors';

import './App.css';

function App(): JSX.Element {
  const user = useSelector((state: RootState) => getUser(state));

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!user,
    authenticationPath: LOGIN_ROUTE,
  };

  return (
    <Container className="App" component="main" maxWidth="xs">
      <CssBaseline />
      <Switch>
        {routes.map((route) => {
          if (!route.isPublic) {
            return (
              <ProtectedRoute
                key={route.path}
                {...route}
                {...defaultProtectedRouteProps}
              />
            );
          } else {
            return <Route key={route.path} {...route} />;
          }
        })}
      </Switch>
    </Container>
  );
}

export default App;
