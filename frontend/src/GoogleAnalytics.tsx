import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const GoogleAnalytics: React.FC = () => {
  const { pathname, search } = useLocation();
  const GOOGLE_ANALYTICS_ID = window.env.GOOGLE_ANALYTICS_ID;

  useEffect(() => {
    const path = `${pathname}${search}`;

    if (GOOGLE_ANALYTICS_ID !== '') {
      ReactGA.initialize(GOOGLE_ANALYTICS_ID);
      ReactGA.pageview(path);
    }
  }, [GOOGLE_ANALYTICS_ID, pathname, search]);

  return <></>;
};

export default GoogleAnalytics;
