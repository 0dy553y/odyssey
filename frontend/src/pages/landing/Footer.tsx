import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const useStyles = makeStyles(() => ({
  landingHeader: {
    height: '3em',
    position: 'relative',
    borderRadius: '2em',
    margin: '5em -45vw 1em -45vw',
    minWidth: '90vw',
    left: '50%',
    right: '50%',
    width: '90vw',
  },
  alignLeft: {
    float: 'left',
    fontFamily: 'CircularStd',
  },
  alignRight: {
    float: 'right',
  },
  socialsIcon: {
    marginRight: '0.3em',
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  const instagramLink = 'https://instagram.com/odyssey.app';

  return (
    <>
      <Box className={classes.landingHeader}>
        <Typography className={classes.alignLeft}>
          Made with &#10084;&#65039; by Team Odyssey
        </Typography>
        <span className={classes.alignRight}>
          <a href={instagramLink}>
            <InstagramIcon className={classes.socialsIcon} target="_blank" />
          </a>
          <FacebookIcon className={classes.socialsIcon} />
        </span>
      </Box>
    </>
  );
};

export default Footer;
