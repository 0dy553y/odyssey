import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route, Switch } from 'react-router-dom';
import { LOGIN_ROUTE, routes } from './routing/routes';
import ProtectedRoute, { ProtectedRouteProps } from './routing/ProtectedRoute';

import './App.css';
import configureStore from './store';
import { Provider } from 'react-redux';

function App(): JSX.Element {
  const store = configureStore();

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: false, // TODO: replace this
    authenticationPath: LOGIN_ROUTE,
  };

  return (
    <Provider store={store}>
      <Container className="App" component="main" maxWidth="xs">
        <CssBaseline />
        <Switch>
          {routes.map((route) => {
            if (!route.isPublic) {
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
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />
              );
            }
          })}
        </Switch>
      </Container>
    </Provider>
  );
}

export default App;
