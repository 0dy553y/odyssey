import React from 'react';
import DescriptionSegment from './DescriptionSegment';
import DescriptionSegmentRight from './DescriptionSegmentRight';
import Navbar from './LandingNavbar';
import { Box } from '@mui/material';
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
      <Section content="Whether you are trying to run your first 5k or trying to pick up reading again, starting something new is always hard." />
      <Section content="But it doesn't have to be this way. Imagine — no more holding back, no more excuses." />
      <Section content="Meet Odyssey: a community based app that guides you through every step of your journey." />
      <div style={{ paddingBottom: '5em' }}></div>
      <DescriptionSegment />
      <DescriptionSegmentRight />
      <EmailBar />
      <Footer />
    </Box>
  );
};

export default LandingPage;
