import React from 'react';
import { AppBar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import icon from '../../assets/images/icon.png';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, .4)',
    backdropFilter: 'blur(10px)',
    padding: '1.5em 2em 1.5em 2em',
    alignItems: 'left',
    textAlign: 'left',
    justifyContent: 'left',
  },
  logo: {
    maxHeight: '3em',
    objectFit: 'contain',
    float: 'left',
    position: 'absolute',
    left: '2em',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  title: {
    display: 'inline-block',
    float: 'left',
    transform: 'translateX(3em)',
  },
}));

const LandingNavbar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.navbar}>
        <img className={classes.logo} src={icon} />
        <Typography variant="h5" className={classes.title}>
          Odyssey
        </Typography>
      </AppBar>
    </>
  );
};

export default LandingNavbar;
