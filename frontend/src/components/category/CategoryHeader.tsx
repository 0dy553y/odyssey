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
  lowerPosition: {
    objectPosition: '20% 60%',
  },
  defaultPosition: {
    objectPosition: '20% 30%',
  },
}));

interface CategoryHeaderProps {
  title: string;
  heading: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = (props) => {
  const { title, heading } = props;
  const classes = useStyles(title);

  /* eslint-disable */
  const headerImage = require('../../assets/images/' + title.toLowerCase() + '.png');

  const getImageClass = (title: string): string => {
    switch (title) {
      case 'Mindfulness':
      case 'Habits':
        return 'classes.lowerPosition';
      default:
        return 'classes.defaultPosition';
    }
  };

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
        <Typography variant="h1" sx={{ paddingBottom: '0.5em', fontFamily: 'Frock' }}>{heading}</Typography>
      </div>
      <img src={headerImage.default} className={`${classes.backgroundImage} ${getImageClass(title)}`}/>
    </Box>
  );
};

export default CategoryHeader;
