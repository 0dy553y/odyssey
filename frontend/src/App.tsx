import React, { useEffect } from 'react';
import { Box, CircularProgress, Container, CssBaseline } from '@mui/material';
import { Global } from '@emotion/react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, privateRoutes, publicRoutes } from './routing/routes';
import ProtectedRoute, { ProtectedRouteProps } from './routing/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { getIsValidatingToken, getUser } from './store/auth/selectors';
import { validateToken } from './store/auth/operations';
import './App.scss';
import BottomNavigationBar from './components/common/BottomNavigationBar';
import { RouteEntry } from './types/routes';
import Notifier from 'components/notifier';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(getUser);
  const isValidatingToken = useSelector(getIsValidatingToken);

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
      <ScrollToTop />
      <Notifier />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50%)`,
            overflow: 'visible',
          },
        }}
      />
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
