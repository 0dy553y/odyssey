import React from 'react';
import Box from '@mui/material/Box';
import cute from '../../assets/images/exercise.png';

const backgroundImage = {
  flexShrink: 0,
  width: '100%',
  zIndex: -1,
  position: 'relative',
  display: 'block',
} as React.CSSProperties;

const gradient = {
  display: 'inline-block',
  background:
    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
};

const overlayText = {
  position: 'absolute',
  display: 'block',
  color: 'white',
  paddingTop: '8em',
  paddingLeft: '1em',
} as React.CSSProperties;

const CategoryHeader: React.FC = () => {
  return (
    <Box
      style={gradient}
      sx={{
        marginTop: 8,
        minWidth: '100%',
        minHeight: '100%',
        borderRadius: '0 0 2em 2em',
        margin: '0 0 1em 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={overlayText}>
        <h3>I want to..</h3>
        <h1>Exercise more</h1>
      </div>
      <img src={cute} style={backgroundImage} />
    </Box>
  );
};

export default CategoryHeader;
