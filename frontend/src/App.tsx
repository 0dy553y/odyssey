import React, { useEffect } from 'react';
import { Box, CircularProgress, Container, CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { LOGIN_ROUTE, routes } from './routing/routes';
import ProtectedRoute, { ProtectedRouteProps } from './routing/ProtectedRoute';
import { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getIsValidatingToken } from './store/auth/selectors';
import { validateToken } from './store/auth/operations';

import './App.css';
import BottomNavigationBar from './components/BottomNavigationBar';

function App(): JSX.Element {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => getUser(state));
  const isValidatingToken = useSelector((state: RootState) =>
    getIsValidatingToken(state)
  );

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!user,
    authenticationPath: LOGIN_ROUTE,
  };

  useEffect(() => {
    dispatch(validateToken());
  }, []);

  const isLoading = isValidatingToken;

  return (
    <Container className="App" component="main" maxWidth="xs">
      <CssBaseline />
      <Switch>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          routes.map((route) => {
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
          })
        )}
      </Switch>
      <BottomNavigationBar />
    </Container>
  );
}

export default App;
