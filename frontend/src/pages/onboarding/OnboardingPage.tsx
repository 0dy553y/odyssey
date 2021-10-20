import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LOGIN_ROUTE, REGISTER_ROUTE } from 'routing/routes';
import { useHistory } from 'react-router-dom';
import onboardingImage from '../../assets/images/onboarding.png';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

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
    overflow: 'scroll',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '2em',
    padding: '2em',
  },
}));

const OnboardingPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
      className="onboarding-page"
    >
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modalContent}>
          <Box className={classes.stickyHeader}>
            <Typography variant="h6" component="h2">
              Hi there &#128075;
              <CloseIcon
                className={classes.closeButton}
                onClick={handleClose}
              />
            </Typography>
          </Box>
          <Typography sx={{ mt: 2 }}>
            Thank you so much for taking the time to try out our app! For the
            best experience, please save Odyssey to your home screen if you are
            viewing on mobile.
            <br />
            <br />
            Odyssey community-based app for completing challenges, which are
            a series of tasks to be completed regularly and typically in increasing
            intensity. These challenges serve to either help users to form
            habits or healthy routines, or are hobby-based challenges that
            encourage and motivate users to explore deeper into interests and
            learn new things.
            <br />
            <br />
            We are still in the midst of user testing and developing more
            features. To enable you to try out our features easily, we have
            provided a limited set of short test challenges that can be done
            with minimum hassle. Any feedback that you provide would be very
            appreciated!
            <br />
            <br />
            &#10084;&#65039; from the Odyssey Team
          </Typography>
        </Box>
      </Modal>
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
