import React, { useEffect } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { Global } from '@emotion/react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  privateRoutes,
  publicRoutes,
  notAuthenticatedRoutes,
} from './routing/routes';
import RouteWithRedirect, {
  RouteWithRedirectProps,
} from './routing/RouteWithRedirect';
import ScrollToTop from './components/common/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { getIsValidatingToken, getUser } from './store/auth/selectors';
import { validateToken } from './store/auth/operations';
import BottomNavigationBar from './components/common/BottomNavigationBar';
import { RouteEntry } from './types/routes';
import Notifier from 'components/notifier';

import './App.scss';
import './react-slider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(getUser);
  const isValidatingToken = useSelector(getIsValidatingToken);

  const defaultPrivateRouteProps: RouteWithRedirectProps = {
    // Redirect if user is not authenticated
    shouldRedirect: !user,
    redirectPath: LOGIN_ROUTE,
  };

  const defaultNotAuthenticatedRouteProps: RouteWithRedirectProps = {
    // Redirect if user is authenticated
    shouldRedirect: !!user,
    redirectPath: HOME_ROUTE,
  };

  useEffect(() => {
    dispatch(validateToken());
  }, []);

  return (
    <Container className="App" component="main" disableGutters>
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
      <div className="App-content-container">
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

              {notAuthenticatedRoutes.map((route: RouteEntry) => (
                <RouteWithRedirect
                  key={route.path}
                  {...route}
                  {...defaultNotAuthenticatedRouteProps}
                />
              ))}

              {privateRoutes.map((route: RouteEntry) => (
                <RouteWithRedirect
                  key={route.path}
                  {...route}
                  {...defaultPrivateRouteProps}
                />
              ))}
            </>
          )}
        </Switch>
      </div>
      {!notAuthenticatedRoutes
        .map((route: RouteEntry) => route.path)
        .includes(location.pathname) && <BottomNavigationBar />}
    </Container>
  );
}

export default App;
