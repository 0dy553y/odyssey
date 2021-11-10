import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  container: Element | null;
}

const ScrollToTop: React.FC<Props> = ({ container }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    container?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
