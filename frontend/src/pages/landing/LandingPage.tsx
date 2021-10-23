import React from 'react';
// import Typography from '@mui/material/Typography';
import Navbar from './LandingNavbar';
import { Box, Typography } from '@mui/material';
import Masthead from './Masthead';
import Footer from './Footer';
import Section from './Section';
import EmailBar from './EmailBar';

import './LandingPage.scss';

const LandingPage: React.FC = () => {
  return (
    <Box className="landing-page">
      <Navbar />
      <Masthead />
      <Section content="Out of this world. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <Section content="Imagine — an app that transforms your life. No more holding back, no more excuses." />
      <Section content="Meet Odyssey." />
      <EmailBar />
      <Footer />
    </Box>
  );
};

export default LandingPage;
