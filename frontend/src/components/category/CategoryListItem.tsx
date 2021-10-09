import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const fuckk = {
  backgroundColor: 'blue',
};

const CategoryListItem: React.FC = () => {
  return (
    <Box>
      <div>
        <Grid style={fuckk} container spacing={2}>
          <Grid item xs={9}>
            <h2>Couch to 5k</h2>
            <p>9 weeks</p>
          </Grid>
          <Grid item xs={3}>
            <CircularProgress
              color="secondary"
              variant="determinate"
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
                position: 'absolute',
              }}
              value={75}
              size={50}
              thickness={8}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default CategoryListItem;
