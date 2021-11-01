import React from 'react';
import { Box, Typography, InputBase, Button, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import obebebe from '../../assets/gifs/obebebe.gif';
import { useHistory } from 'react-router-dom';
import { ONBOARDING_ROUTE } from 'routing/routes';

const useStyles = makeStyles(() => ({
  landingHeader: {
    background: 'linear-gradient(to right, #7B70BF , #BF8E82)',
    position: 'relative',
    borderRadius: '2em',
    margin: '10em -45vw 1em -45vw',
    minWidth: '90vw',
    left: '50%',
    right: '50%',
    width: '90vw',
    padding: '3em',
    display: 'Flex',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emailInput: {
    padding: '0.7em',
    minWidth: '50px',
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
    display: 'inline-block',
    height: '20em',
    objectFit: 'none',
  },
  text: {
    display: 'inline-block',
    marginLeft: '2em',
    paddingLeft: '2em',
  },
  cta: {
    color: 'white',
    padding: '0.5em 0 0.5em 0',
  },
}));

const EmailBar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.landingHeader} id="form">
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <img className={classes.astronaut} src={obebebe} />
        <Box className="text">
          <Typography variant="h4" className={classes.headerText}>
            Don&apos;t miss out on our takeoff 🚀
          </Typography>
          <Typography className={classes.cta}>
            A beta release of Odyssey is now available! Join us for an
            experience that is out of this world.
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
            Sign up now
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EmailBar;
