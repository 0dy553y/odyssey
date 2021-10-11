import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import cute from '../../assets/images/exercise.png';

const useStyles = makeStyles(() => ({
  backgroundImage: {
    flexShrink: 0,
    width: '100%',
    zIndex: -1,
    position: 'relative',
    display: 'block',
    borderRadius: '0 0 2em 2em',
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
    paddingLeft: '1em',
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
        borderRadius: '0 0 2em 2em',
        margin: '0 -50vw 1em -50vw',
        maxWidth: '100vw',
        left: '50%',
        right: '50%',
        width: '100vw',
      }}
    >
      <div className={classes.overlayText}>
        <h3>I want to..</h3>
        <h1>{heading}</h1>
      </div>
      <img src={headerImage.default} className={classes.backgroundImage} />
    </Box>
  );
};

export default CategoryHeader;
