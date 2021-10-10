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
  setOpacity: {
    opacity: 0.5,
  },
} as const;

const CategoryListItem: React.FC = () => {
  return (
    <Box>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h3>Couch to 5k</h3>
            <p>Couch to 5k 9 weeks</p>
          </Grid>
          <Grid item xs={2} style={styles.verticalAlign}>
            <CircularProgress
              color="primary"
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
              style={styles.setOpacity}
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
