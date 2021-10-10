import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import cute from '../../assets/images/exercise.png';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(() => ({
  backgroundImage: {
    flexShrink: 0,
    width: '100%',
    zIndex: -1,
    position: 'relative',
    display: 'block',
  },
  gradient: {
    display: 'inline-block',
    background:
      'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
  },
  overlayText: {
    position: 'absolute',
    display: 'block',
    color: 'white',
    paddingTop: '5em',
    paddingLeft: '1em',
  },
}));

interface CategoryPreviewProps {
  heading: string;
}

const CategoryPreview: React.FC<CategoryPreviewProps> = (props) => {
  const classes = useStyles();
  const { heading } = props;

  return (
    <Box
      className={classes.gradient}
      sx={{
        width: '100%',
        height: '12em',
        borderRadius: '2em',
        margin: '0 0 1em 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div className={classes.overlayText}>
        <Typography variant="h4">{heading}</Typography>
      </div>
      <img src={cute} className={classes.backgroundImage} />
    </Box>
  );
};

export default CategoryPreview;
