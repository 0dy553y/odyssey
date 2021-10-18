import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(() => ({
  backgroundImage: {
    flexShrink: 0,
    width: '100%',
    zIndex: -1,
    position: 'relative',
    display: 'block',
    objectFit: 'cover',
    objectPosition: '100% 30%',
    borderRadius: '2em',
    height: '14em',
  },
  gradient: {
    display: 'inline-block',
    background:
      'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
    webkitMaskImage: '-webkit-radial-gradient(white, black)',
  },
  overlayText: {
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: '6em',
    paddingLeft: '1em',
  },
}));

interface CategoryPreviewProps {
  title: string;
  heading: string;
}

const CategoryPreview: React.FC<CategoryPreviewProps> = (props) => {
  const classes = useStyles();
  const { title, heading } = props;
  /* eslint-disable */
  const headerImage = require('../../assets/images/' + title.toLowerCase() + '.png');

  return (
    <Box
      className={classes.gradient}
      sx={{
        width: '100%',
        height: '14em',
        borderRadius: '2em',
        margin: '0 0 1em 0',
        position: 'relative',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <img src={headerImage.default} className={classes.backgroundImage} />
      <div className={classes.overlayText}>
        <Typography variant="h4">{heading}</Typography>
      </div>
    </Box>
  );
};

export default CategoryPreview;
