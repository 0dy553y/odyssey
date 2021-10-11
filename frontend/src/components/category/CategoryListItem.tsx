import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { getFormattedStringFromDays } from 'utils/formatting';

const useStyles = makeStyles(() => ({
  verticalAlign: {
    bottom: 0,
  },
  setOpacity: {
    opacity: 0.5,
  },
}));

interface CategoryListProps {
  name: string;
  duration: number;
}

const CategoryListItem: React.FC<CategoryListProps> = (props) => {
  const classes = useStyles();
  const { name, duration } = props;
  console.log(name);
  console.log(duration);

  return (
    <Box>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <h3>{name}</h3>
            <p>{getFormattedStringFromDays(duration)}</p>
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
