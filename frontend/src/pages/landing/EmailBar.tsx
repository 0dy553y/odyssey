import React from 'react';
import { Box, Typography, InputBase, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import obebebe from '../../assets/gifs/obebebe.gif';

const useStyles = makeStyles(() => ({
  landingHeader: {
    height: '20em',
    background: 'linear-gradient(to right, #7B70BF , #BF8E82)',
    position: 'relative',
    borderRadius: '2em',
    margin: '5em -45vw 1em -45vw',
    minWidth: '90vw',
    left: '50%',
    right: '50%',
    width: '90vw',
    padding: '3em',
    display: 'Flex',
    // flexDirection: 'column',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emailInput: {
    padding: '0.7em',
    minWidth: '30px',
    width: '40vw',
    maxWidth: '300px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '1em',
    color: 'white',
    marginTop: '2em',
    marginRight: '1em',
  },
  emailField: {
    display: 'Flex',
  },
  emailButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '1em',
    color: 'white',
    padding: '0.8em',
    marginTop: '2.2em',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  astronaut: {
    // zIndex: 1,
    // position: 'absolute',
    display: 'inline-block',
    height: '20em',
    // left: 0,
  },
  text: {
    display: 'inline-block',
  },
  cta: {
    color: 'white',
    padding: '0.5em 0 0.5em 0',
  },
}));

const EmailBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.landingHeader}>
        <img className={classes.astronaut} src={obebebe} />
        <Box className="text">
          <Typography variant="h4" className={classes.headerText}>
            Don&apos;t miss out on our takeoff 🚀
          </Typography>
          <Typography className={classes.cta}>
            Odyssey will be ready very soon. Join us for early access and keep
            up with updates and our release!
          </Typography>
          <Box className={classes.emailField}>
            <InputBase
              className={classes.emailInput}
              placeholder="Your email"
            ></InputBase>
            <Button className={classes.emailButton}>Join</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EmailBar;
