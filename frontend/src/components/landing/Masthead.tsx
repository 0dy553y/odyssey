import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import mastheadImage from '../../assets/images/masthead.png';
import { ONBOARDING_ROUTE } from 'routing/routes';

const useStyles = makeStyles(() => ({
  landingHeader: {
    height: '45em',
    minHeight: '80vh',
    backgroundColor: '#1695B6',
    backgroundSize: 'cover',
    position: 'relative',
    borderRadius: '2em',
    margin: '5em -45vw 1em -45vw',
    minWidth: '90vw',
    left: '50%',
    right: '50%',
    width: '90vw',
    marginBottom: '8em',
    textAlign: 'center',
    backgroundPosition: 'center center',
  },
  subText: {
    paddingTop: '2em',
    paddingBottom: '1em',
    color: '#CEE4EA',
  },
  mainText: {
    fontSize: 'calc(min(5vw, 25px)',
    color: 'white',
  },
  mastheadImage: {
    flexShrink: 0,
    width: '100%',
    position: 'relative',
    display: 'block',
    borderRadius: '2em',
    height: 'auto',
    maxHeight: '45em',
    minWidth: '100%',
  },
}));

const LandingHeader: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      className={classes.landingHeader}
      style={{ backgroundImage: `url(${mastheadImage})` }}
    >
      <Typography className={classes.subText}>BETA RELEASE</Typography>
      <Typography variant="h3" className={classes.mainText}>
        Reach new heights.
      </Typography>
      <Button
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderRadius: '1em',
          color: 'white',
          padding: '0.8em 1em 0.8em 1em',
          marginTop: '2.2em',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 1)',
          },
        }}
        onClick={() => {
          history.push(ONBOARDING_ROUTE);
        }}
      >
        Get started
      </Button>
    </Box>
  );
};

export default LandingHeader;
