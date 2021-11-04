import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Global } from '@emotion/react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {
  ONBOARDING_ROUTE,
  HOME_ROUTE,
  privateRoutes,
  publicRoutes,
  mainRoutes,
  notAuthenticatedRoutes,
} from './routing/routes';
import RouteWithRedirect, {
  RouteWithRedirectProps,
} from './routing/RouteWithRedirect';
import ScrollToTop from './components/common/ScrollToTop';
import { batch, useDispatch, useSelector } from 'react-redux';
import { getIsValidatingToken, getUser } from './store/auth/selectors';
import { validateToken } from './store/auth/operations';
import BottomNavigationBar from './components/common/BottomNavigationBar';
import { RouteEntry } from './types/routes';
import Notifier from 'components/notifier';
import FeedbackOverlay from './components/common/FeedbackOverlay';
import { useCache } from 'components/common/cacheProvider';
import GoogleAnalytics from './GoogleAnalytics';
import LoadingPage from 'pages/loading/LoadingPage';
import { setRedirectUrl } from './store/auth/actions';
import Div100vh from 'react-div-100vh';

import './App.scss';
import 'swiper/swiper-bundle.css';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLatestVersion, refreshCacheAndReload } = useCache();

  const user = useSelector(getUser);
  const isValidatingToken = useSelector(getIsValidatingToken);

  const defaultPrivateRouteProps: RouteWithRedirectProps = {
    // Redirect if user is not authenticated
    shouldRedirect: !user,
    redirectPath: ONBOARDING_ROUTE,
  };

  const defaultNotAuthenticatedRouteProps: RouteWithRedirectProps = {
    // Redirect if user is authenticated
    shouldRedirect: !!user,
    redirectPath: HOME_ROUTE,
  };

  useEffect(() => {
    batch(() => {
      dispatch(validateToken());
      dispatch(setRedirectUrl(location.pathname));
    });

    if (!isLatestVersion) {
      refreshCacheAndReload();
    }
  }, []);

  return (
    <Div100vh>
      <Container
        className="App"
        component="main"
        disableGutters
        maxWidth={false}
      >
        <GoogleAnalytics />
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
          <Container className="column-container" disableGutters maxWidth="sm">
            <Switch>
              {isValidatingToken ? (
                <LoadingPage />
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
          </Container>
        </div>
        {mainRoutes
          .map((route: RouteEntry) => route.path)
          .includes(location.pathname) && <BottomNavigationBar />}
        {privateRoutes
          .map((route: RouteEntry) => route.path)
          .includes(location.pathname) && <FeedbackOverlay />}
      </Container>
    </Div100vh>
  );
}

export default App;
