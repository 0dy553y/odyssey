import React from 'react';
import Typography from '@mui/material/Typography';
import Navbar from './LandingNavbar';
import { Box } from '@mui/material';
import LandingHeader from './LandingHeader';

import './LandingPage.scss';

const LandingPage: React.FC = () => {
  return (
    <Box className="landing-page">
      {/* <div id="inverted-cursor"></div> */}
      <Navbar />
      <LandingHeader />
    </Box>
  );
};

export default LandingPage;
