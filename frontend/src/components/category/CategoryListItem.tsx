import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const useStyles = makeStyles(() => ({
  verticalAlign: {
    bottom: 0,
  },
  setOpacity: {
    opacity: 0.5,
  },
}));

const CategoryListItem: React.FC = () => {
  const classes = useStyles();

  return (
    <Box>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <h3>Couch to 5k</h3>
            <p>Couch to 5k 9 weeks</p>
          </Grid>
          <Grid item xs={3} className={classes.verticalAlign}>
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
              className={classes.setOpacity}
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
