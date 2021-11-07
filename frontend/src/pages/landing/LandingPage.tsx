import React from 'react';
import Navbar from 'components/landing/LandingNavbar';
import { Box, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Masthead from 'components/landing/Masthead';
import Footer from 'components/landing/Footer';
import Section from 'components/landing/Section';
import EmailBar from 'components/landing/EmailBar';
import obebebe from 'assets/gifs/obebebe.gif';
import runnin from 'assets/gifs/runnin.gif';
import study from 'assets/gifs/study.gif';
import explore from 'assets/images/explore.png';
import message from 'assets/images/message.png';
import { InView, useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme: Theme) => ({
  landingPage: {
    marginLeft: '1.5em',
    marginRight: '1.5em',
  },
  descriptionSegment: {
    position: 'relative',
    margin: '5em -40vw 1em -40vw',
    minWidth: '80vw',
    left: '50%',
    right: '50%',
    width: '80vw',
    overflow: 'hidden',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  section: {
    marginBottom: '5em',
    [theme.breakpoints.between('md', 'xl')]: {
      marginLeft: '50%',
      transform: 'translateX(-50%)',
    },
  },
  sideDescription: {
    paddingTop: '5em',
    paddingBottom: '2em',
    textAlign: 'center',
    display: 'inline-block',
  },
  topDescription: {
    color: '#0785a5',
    marginBottom: '1em',
  },
  sideImage: {
    maxWidth: '100%',
  },
  sideImageMessage: {
    maxWidth: '100%',
    paddingTop: '20%',
  },
  runnin: {
    marginBottom: '1em',
  },
  study: {
    marginBottom: '1em',
    marginLeft: '80%',
  },
  specialUnderline: {
    background: 'linear-gradient(to bottom, #88d8fd 0%, #88d8fd 100%)',
    backgroundPosition: '0 100%',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '4px 4px',
    transition: 'background-size 0.5s',
    '&:hover': {
      backgroundSize: '4px 50px',
    },
  },
}));

const LandingPage: React.FC = () => {
  const classes = useStyles();
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  });

  return (
    <Box className={classes.landingPage}>
      <Navbar isMastheadInView={inView} />
      <div ref={ref}>
        <Masthead />
      </div>
      <Section content="Whether you are trying to run your first 5km or pick up reading again, starting something new can be pretty hard." />
      <img className={classes.study} src={study} />
      <Section content="But it doesn't have to be this way. Imagine — no more excuses, no more holding back." />
      <img className={classes.runnin} src={runnin} />
      <Box className={classes.section}>
        <InView threshold={1}>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Typography variant="h4">
                Meet <span className={classes.specialUnderline}>Odyssey</span>:
                the app that supports and guides you through every step of your
                journey.
              </Typography>
            </motion.div>
          )}
        </InView>
      </Box>
      <div style={{ paddingBottom: '3em' }}></div>
      <Box className={classes.descriptionSegment}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Box className={classes.sideDescription}>
            <Typography variant="body1" className={classes.topDescription}>
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
            <img className={classes.sideImage} src={explore} />
          </Box>
        </Stack>
      </Box>
      <Box className={classes.descriptionSegment}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Box>
            <img src={obebebe} />
          </Box>
          <Box className={classes.sideDescription}>
            <Typography variant="body1" className={classes.topDescription}>
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
      <Box className={classes.descriptionSegment}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 5 }}
        >
          <Box className={classes.sideDescription}>
            <Typography variant="body1" className={classes.topDescription}>
              FIND YOUR FLOCK
            </Typography>
            <Typography variant="h4">
              Join and share your experience with a supportive community of
              like-minded, passionate individuals.
            </Typography>
          </Box>
          <Box>
            <img className={classes.sideImageMessage} src={message} />
          </Box>
        </Stack>
      </Box>
      <EmailBar />
      <Footer />
    </Box>
  );
};

export default LandingPage;
