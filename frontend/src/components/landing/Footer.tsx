import React from 'react';
import { Box, Typography } from '@mui/material';
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
  const facebookLink = 'https://www.facebook.com/Odyssey-112445401208984/';

  return (
    <Box className={classes.landingHeader}>
      <Typography className={classes.alignLeft}>
        Made with &#10084;&#65039; by Team Odyssey
      </Typography>
      <span className={classes.alignRight}>
        <a href={instagramLink} target="_blank" rel="noreferrer">
          <InstagramIcon className={classes.socialsIcon} />
        </a>
        <a href={facebookLink} target="_blank" rel="noreferrer">
          <FacebookIcon className={classes.socialsIcon} />
        </a>
      </span>
    </Box>
  );
};

export default Footer;
