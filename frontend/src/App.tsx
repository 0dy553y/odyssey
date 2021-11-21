import React, { useEffect, useRef } from 'react';
import { Stack, Container } from '@mui/material';
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
import { useCache } from 'components/common/cacheProvider';
import GoogleAnalytics from './GoogleAnalytics';
import LoadingPage from 'pages/loading/LoadingPage';
import { setRedirectUrl } from './store/auth/actions';
import SideNavigationBar from 'components/common/SideNavigationBar';
import { useIsDesktop } from 'utils/windowSize';
import Div100vh from 'react-div-100vh';

import './App.scss';
import 'swiper/swiper-bundle.css';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLatestVersion, refreshCacheAndReload } = useCache();
  const isDesktop = useIsDesktop();

  const user = useSelector(getUser);
  const isValidatingToken = useSelector(getIsValidatingToken);

  const contentContainerRef = useRef<null | HTMLDivElement>(null);

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

  const renderContent = () => {
    return (
      <Div100vh className="App">
        <Container
          className="App"
          component="main"
          disableGutters
          maxWidth={false}
        >
          <GoogleAnalytics />
          <ScrollToTop container={contentContainerRef.current} />
          <Notifier />
          <Global
            styles={{
              '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50%)`,
                overflow: 'visible',
              },
            }}
          />
          <div className="App-content-container" ref={contentContainerRef}>
            <Container
              className="column-container"
              disableGutters
              maxWidth={
                isDesktop || location.pathname === ONBOARDING_ROUTE
                  ? false
                  : 'sm'
              }
            >
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
          {!isDesktop &&
            mainRoutes
              .map((route: RouteEntry) => route.path)
              .includes(location.pathname) && <BottomNavigationBar />}
        </Container>
      </Div100vh>
    );
  };

  const renderDesktopApp = () => {
    return (
      <Stack direction="row">
        {!notAuthenticatedRoutes
          .map((route: RouteEntry) => route.path)
          .includes(location.pathname) && <SideNavigationBar />}
        {renderContent()}
      </Stack>
    );
  };

  return isDesktop ? renderDesktopApp() : renderContent();
}

export default App;
