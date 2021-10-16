import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  backgroundImage: {
    flexShrink: 0,
    width: '100%',
    maxHeight: '55vh',
    zIndex: -1,
    position: 'relative',
    display: 'block',
    borderRadius: '0 0 5vh 5vh',
    objectFit: 'cover',
    objectPosition: '20% 30%',
  },
  gradient: {
    display: 'inline-block',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
  },
  overlayText: {
    position: 'absolute',
    display: 'block',
    color: 'white',
    bottom: '0',
    paddingLeft: '2em',
  },
}));

interface CategoryHeaderProps {
  title: string;
  heading: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = (props) => {
  const classes = useStyles();
  const { title, heading } = props;
  /* eslint-disable */
  const headerImage = require('../../assets/images/' + title.toLowerCase() + '.png');

  return (
    <Box
      className={classes.gradient}
      sx={{
        position: 'relative',
        borderRadius: '0 0 5vh 5vh',
        margin: '0 -50vw 1em -50vw',
        minWidth: '100vw',
        maxHeight: '55vh',
        left: '50%',
        right: '50%',
        width: '100vw',
      }}
    >
      <div className={classes.overlayText}>
        <Typography variant="h5">I want to...</Typography>
        <Typography variant="h3" sx={{ paddingBottom: '0.5em', fontFamily: 'Frock' }}>{heading}</Typography>
      </div>
      <img src={headerImage.default} className={classes.backgroundImage} />
    </Box>
  );
};

export default CategoryHeader;
