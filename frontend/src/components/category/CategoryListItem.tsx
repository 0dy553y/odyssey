import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { getFormattedStringFromDays } from 'utils/formatting';

const useStyles = makeStyles(() => ({
  setOpacity: {
    opacity: 0.5,
    position: 'absolute',
  },
  help: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
        <div className={classes.help}>
          <Grid item xs={9}>
            <h3>{name}</h3>
            <p>{getFormattedStringFromDays(duration)}</p>
          </Grid>
          <Grid item xs={2}>
            <CircularProgress
              color="primary"
              variant="determinate"
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
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
              }}
              value={75}
              size={50}
              thickness={8}
            />
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default CategoryListItem;
