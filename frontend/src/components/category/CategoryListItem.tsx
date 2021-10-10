import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const styles = {
  verticalAlign: {
    paddingTop: '2.5em',
  },
} as const;

const CategoryListItem: React.FC = () => {
  return (
    <Box>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <h3>Couch to 5k</h3>
            <p>Couch to 5k 9 weeks</p>
          </Grid>
          <Grid item xs={3} style={styles.verticalAlign}>
            <CircularProgress
              color="secondary"
              variant="determinate"
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
                position: 'absolute',
              }}
              value={100}
              size={50}
              thickness={8}
            />
            <CircularProgress
              color="primary"
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
