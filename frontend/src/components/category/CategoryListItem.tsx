import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { getFormattedStringFromDays } from 'utils/formatting';
import { Typography } from '@mui/material';

import './CategoryListItem.scss';

const useStyles = makeStyles(() => ({
  setOpacity: {
    opacity: 0.5,
    position: 'absolute',
  },
  help: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0 2em 0',
  },
  temp: {
    // backgroundColor: 'red',
  },
  animateProgress: {
    transition: '4s ease',
    transitionDelay: '4s',
  },
}));

interface CategoryListProps {
  name: string;
  duration: number;
}

const CategoryListItem: React.FC<CategoryListProps> = (props) => {
  const classes = useStyles();
  const { name, duration } = props;

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(80);
  }, []);

  return (
    <Box>
      <div>
        <div className={classes.help}>
          <div className="square"></div>
          <Grid item xs={9}>
            <Typography component="div" variant="h6">
              {name}
            </Typography>
            <Typography component="div" variant="body1">
              {getFormattedStringFromDays(duration)}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.temp}>
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
              thickness={7}
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
              className={classes.animateProgress}
              value={progress}
              size={50}
              thickness={7}
            />
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default CategoryListItem;
