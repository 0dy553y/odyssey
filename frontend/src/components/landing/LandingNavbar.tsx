import React from 'react';
import { AppBar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import icon from '../../assets/images/icon.png';
import { useHistory } from 'react-router-dom';
import { ONBOARDING_ROUTE } from 'routing/routes';
import { motion } from 'framer-motion';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: 'rgba(255, 255, 255, .4)',
    backdropFilter: 'blur(10px)',
    padding: '1.5em 2em 1.5em 2em',
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
    fontWeight: 'bold',
  },
  alignRight: {
    float: 'right',
  },
}));

interface LandingNavbarProps {
  isMastheadInView: boolean;
}

const LandingNavbar: React.FC<LandingNavbarProps> = (props) => {
  const { isMastheadInView } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar className={classes.navbar}>
      <img className={classes.logo} src={icon} />
      <Typography variant="h5" className={classes.title}>
        Odyssey
      </Typography>
      <span className={classes.alignRight}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={
            !isMastheadInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Button
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 1)',
              borderRadius: '1em',
              color: 'white',
              padding: '0.8em 1em 0.8em 1em',
              width: '9em',
              float: 'right',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 1)',
              },
              margin: '-2.8em 1em -2em 0',
            }}
            onClick={() => {
              history.push(ONBOARDING_ROUTE);
            }}
          >
            Get started
          </Button>
        </motion.div>
      </span>
    </AppBar>
  );
};

export default LandingNavbar;
