import React from 'react';
import {
  CircularProgress,
  CircularProgressProps,
  Typography,
  Box,
} from '@mui/material';

import './CircularProgressWithLabel.scss';

// Adapted from https://mui.com/components/progress/#CircularWithValueLabel.tsx
const CircularProgressWithLabel: React.FC<
  CircularProgressProps & { value: number }
> = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box className="circular-progress-label-container">
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
