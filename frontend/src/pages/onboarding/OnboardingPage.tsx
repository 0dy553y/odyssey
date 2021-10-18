import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LOGIN_ROUTE, REGISTER_ROUTE } from 'routing/routes';
import { useHistory } from 'react-router-dom';
import onboardingImage from '../../assets/images/onboarding.png';

import './OnboardingPage.scss';

const useStyles = makeStyles(() => ({
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
    fontSize: '25px',
  },
}));

const OnboardingPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className="onboarding-page"
    >
      <Typography className={classes.appName}>Odyssey</Typography>
      <img src={onboardingImage}></img>
      <Typography variant="h5">Challenge yourself.</Typography>
      <Box sx={{ marginTop: 5 }}>
        <Button
          fullWidth
          variant="contained"
          className={classes.loginButton}
          disableElevation
          onClick={() => {
            history.push(LOGIN_ROUTE);
          }}
        >
          Login
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
          Register
        </Button>
      </Box>
    </Box>
  );
};
export default OnboardingPage;
