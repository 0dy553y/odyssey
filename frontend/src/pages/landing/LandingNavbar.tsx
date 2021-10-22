import React from 'react';
import { AppBar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, .4)',
    backdropFilter: 'blur(5px)',
    padding: '1.5em 2em 1.5em 2em',
  },
}));

const LandingNavbar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.navbar}>
        <span>Odyssey</span>
      </AppBar>
    </>
  );
};

export default LandingNavbar;
