import React from 'react';
import Box from '@mui/material/Box';
import cute from '../../assets/images/exercise.png';

const styles = {
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
    paddingTop: '4em',
    paddingLeft: '1em',
  },
} as const;

const CategoryPreview: React.FC = () => {
  return (
    <Box
      style={styles.gradient}
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
      <div style={styles.overlayText}>
        <h2>Exercise more</h2>
      </div>
      <img src={cute} style={styles.backgroundImage} />
    </Box>
  );
};

export default CategoryPreview;
