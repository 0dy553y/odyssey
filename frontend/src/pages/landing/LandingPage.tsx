import React from 'react';
import Navbar from './LandingNavbar';
import { Box, Stack, Typography } from '@mui/material';
import Masthead from './Masthead';
import Footer from './Footer';
import Section from './Section';
import EmailBar from './EmailBar';
import obebebe from '../../assets/gifs/obebebe.gif';
import explore from '../../assets/images/explore.png';
import message from '../../assets/images/message.png';

import './LandingPage.scss';

const LandingPage: React.FC = () => {
  return (
    <Box className="landing-page">
      <Navbar />
      <Masthead />
      <Section content="Whether you are trying to run your first 5k or pick up reading again, starting something new can be pretty damn hard." />
      <Section content="But it doesn't have to be this way. Imagine — no more excuses, no more holding back." />
      <Section content="Meet Odyssey: an app that supports and guides you through every step of your journey." />
      <div style={{ paddingBottom: '5em' }}></div>
      <Box className="description-segment">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Box className="side-description">
            <Typography variant="body1" className="top-description">
              MAKE IT HAPPEN
            </Typography>
            <Typography variant="h4">
              No matter your interests or goals, there&apos;s something for you
              in Odyssey&apos;s lineup of curated challenges, carefully designed
              to increment in difficulty at a suitable pace.
            </Typography>
          </Box>
          <Box>
            <img className="side-image" src={explore} />
          </Box>
        </Stack>
      </Box>
      <Box className="description-segment">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Box>
            <img src={obebebe} />
          </Box>
          <Box className="side-description">
            <Typography variant="body1" className="top-description">
              CELEBRATE EVERY MILESTONE
            </Typography>
            <Typography variant="h4">
              Challenge yourself and your friends to reach your goals. And why
              not have fun while at it?
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box className="description-segment">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Box className="side-description">
            <Typography variant="body1" className="top-description">
              FIND YOUR FLOCK
            </Typography>
            <Typography variant="h4">
              Join and share your experience with a supportive community of
              like-minded, passionate individuals.
            </Typography>
          </Box>
          <Box>
            <img className="side-image-message" src={message} />
          </Box>
        </Stack>
      </Box>
      <EmailBar />
      <Footer />
    </Box>
  );
};

export default LandingPage;
