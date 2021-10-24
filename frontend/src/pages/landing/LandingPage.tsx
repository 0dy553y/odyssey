import React from 'react';
import Navbar from 'components/landing/LandingNavbar';
import { Box, Stack, Typography } from '@mui/material';
import Masthead from 'components/landing/Masthead';
import Footer from 'components/landing/Footer';
import Section from 'components/landing/Section';
import EmailBar from 'components/landing/EmailBar';
import obebebe from 'assets/gifs/obebebe.gif';
import runnin from 'assets/gifs/runnin.gif';
import study from 'assets/gifs/study.gif';
import explore from 'assets/images/explore.png';
import message from 'assets/images/message.png';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import './LandingPage.scss';

const LandingPage: React.FC = () => {
  return (
    <Box className="landing-page">
      <Navbar />
      <Masthead />
      <Section content="Whether you are trying to run your first 5km or pick up reading again, starting something new can be pretty hard." />
      <img className="study" src={study} />
      <Section content="But it doesn't have to be this way. Imagine — no more excuses, no more holding back." />
      <img className="runnin" src={runnin} />
      <Box className="section">
        <InView threshold={1}>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Typography variant="h4">
                Meet <span className="special-underline">Odyssey</span>: the app
                that supports and guides you through every step of your journey.
              </Typography>
            </motion.div>
          )}
        </InView>
      </Box>
      <div style={{ paddingBottom: '3em' }}></div>
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
              No matter your interests or goals, there&apos;s something for you.
              Odyssey&apos;s lineup of curated challenges are carefully designed
              to increment in difficulty at a suitable pace to make your journey
              a breeze.
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
              not have fun while at it? Map your journey together through
              unknown worlds and collect your pot of gold at the end of each
              rainbow.
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
