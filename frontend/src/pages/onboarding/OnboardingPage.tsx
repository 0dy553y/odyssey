import React from 'react';
import { Box, Button, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LOGIN_ROUTE, REGISTER_ROUTE } from 'routing/routes';
import { useHistory } from 'react-router-dom';
import { Liquidswipe } from 'react-liquidswipe';
import OnboardingSlide from 'pages/onboarding/OnboardingSlide';

import './OnboardingPage.scss';

const useStyles = makeStyles((theme: Theme) => ({
  loginButton: {
    padding: '1.3em 3em 1.3em 3em',
    borderRadius: '1.5em',
  },
  registerButton: {
    marginTop: '1em',
    marginBottom: '2em',
    padding: '1.3em 3em 1.3em 3em',
    borderRadius: '1.5em',
    backgroundColor: 'transparent',
    color: 'black',
    border: '1px black solid',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: '27px',
    zIndex: 1,
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '5%',
    // color: 'white',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  stickyHeader: {
    position: 'sticky',
    top: '-2em',
    marginTop: '-2em',
    marginBottom: '-2em',
    background:
      'linear-gradient(to bottom,  rgba(255, 255, 255, 1) 60%, rgba(233, 233, 233, 0) 100%)',
    paddingTop: '2em',
    paddingBottom: '2em',
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80vw',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '2em',
    padding: '2em',
  },
  onboardingImage: {
    filter: 'invert(1)',
    height: '45vh',
    marginTop: '15vh',
    marginBottom: '1em',
  },
  description: {
    display: 'inline-block',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '70vw',
    },
  },
}));

const OnboardingPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const components = [];

  components.push(
    <OnboardingSlide
      imgUrl={require('assets/gifs/onboarding1.png')}
      description="Explore challenges that help you to achieve more."
      color="#082509"
    />
  );

  components.push(
    <OnboardingSlide
      imgUrl={require('assets/gifs/onboarding2.png')}
      description="Enjoy the journey and conquer the unknown."
      color="#834720"
    />
  );

  components.push(
    <OnboardingSlide
      imgUrl={require('assets/gifs/onboarding3.png')}
      description="Find a supportive community waiting for you."
      color="#67225c"
    />
  );

  return (
    <Box>
      <Typography className={classes.appName} variant="h4">
        Odyssey
      </Typography>
      <Liquidswipe
        components={components}
        style={{
          height: '100vh',
          width: '100vw',
          color: 'black',
          filter: 'invert(1)',
        }}
      />
      <Box
        sx={{
          zIndex: 1,
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 10,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          className={classes.loginButton}
          disableElevation
          onClick={() => {
            history.push(LOGIN_ROUTE);
          }}
        >
          <Typography variant="body1">Login</Typography>
        </Button>
        <Button
          fullWidth
          variant="outlined"
          className={classes.registerButton}
          disableElevation
          onClick={() => {
            history.push(REGISTER_ROUTE);
          }}
        >
          <Typography variant="body1">Register</Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default OnboardingPage;
