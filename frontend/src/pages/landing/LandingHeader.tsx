import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  landingHeader: {
    height: '40em',
    backgroundColor: 'pink',
    position: 'relative',
    borderRadius: '2em',
    margin: '5em -45vw 1em -45vw',
    minWidth: '90vw',
    left: '50%',
    right: '50%',
    width: '90vw',
  },
}));

const LandingHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.landingHeader}>
        <span>Odyssey</span>
      </Box>
    </>
  );
};

export default LandingHeader;
