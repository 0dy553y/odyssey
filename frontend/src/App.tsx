import React, { useEffect } from 'react';
import { Box, CircularProgress, Container, CssBaseline } from '@mui/material';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, privateRoutes, publicRoutes } from './routing/routes';
import ProtectedRoute, { ProtectedRouteProps } from './routing/ProtectedRoute';
import { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { getIsValidatingToken, getUser } from './store/auth/selectors';
import { validateToken } from './store/auth/operations';
import './App.css';
import BottomNavigationBar from './components/common/BottomNavigationBar';
import { RouteEntry } from './types/routes';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

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

  return (
    <Container className="App" component="main" maxWidth="xs">
      <CssBaseline />
      <Switch>
        {isValidatingToken ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {publicRoutes.map((route: RouteEntry) => (
              <Route key={route.path} {...route} />
            ))}
            {privateRoutes.map((route: RouteEntry) => (
              <ProtectedRoute
                key={route.path}
                {...route}
                {...defaultProtectedRouteProps}
              />
            ))}
          </>
        )}
      </Switch>
      {!publicRoutes
        .map((route: RouteEntry) => route.path)
        .includes(location.pathname) && <BottomNavigationBar />}
    </Container>
  );
}

export default App;
