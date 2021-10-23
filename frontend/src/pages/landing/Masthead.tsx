import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import mastheadImage from '../../assets/images/masthead.png';

const useStyles = makeStyles(() => ({
  landingHeader: {
    height: '45em',
    backgroundColor: '#1695B6',
    backgroundSize: 'cover',
    position: 'relative',
    borderRadius: '2em',
    margin: '5em -45vw 1em -45vw',
    minWidth: '90vw',
    left: '50%',
    right: '50%',
    width: '90vw',
    marginBottom: '5em',
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
    // objectFit: 'cover',
    // objectPosition: '100% 0%',
    borderRadius: '2em',
    height: 'auto',
    // position: 'absolute',
    maxHeight: '45em',
    left: 0,
    bottom: 0,
    minWidth: '100%',
  },
}));

const LandingHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box
        className={classes.landingHeader}
        style={{ backgroundImage: `url(${mastheadImage})` }}
      >
        <Typography className={classes.subText}>COMING SOON</Typography>
        <Typography variant="h3" className={classes.mainText}>
          Reach new heights.
        </Typography>
      </Box>
    </>
  );
};

export default LandingHeader;
