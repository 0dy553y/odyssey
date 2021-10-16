import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { getFormattedStringFromDays } from 'utils/formatting';
import { Typography, Theme } from '@mui/material';

import './CategoryListItem.scss';

const useStyles = makeStyles((theme: Theme) => ({
  setOpacity: {
    opacity: 0.5,
    position: 'absolute',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0 2em 0',
  },
  animateProgress: {
    transition: '4s ease',
    transitionDelay: '4s',
  },
  fillIcon: {
    fill: theme.palette.primary.main,
  },
}));

interface CategoryListProps {
  name: string;
  duration: number;
  percentageComplete: number;
}

const CategoryListItem: React.FC<CategoryListProps> = (props) => {
  const classes = useStyles();
  const { name, duration, percentageComplete } = props;

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(percentageComplete);
  }, []);

  return (
    <Box>
      <div>
        <div className={classes.container}>
          <div className="square"></div>
          <Grid item xs={9}>
            <Typography component="div" variant="h6">
              {name}
            </Typography>
            <Typography component="div" variant="body1">
              {getFormattedStringFromDays(duration)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <CircularProgress
              color="primary"
              variant="determinate"
              sx={{
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
                marginTop: '0.5em',
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
                marginTop: '0.5em',
              }}
              className={classes.animateProgress}
              value={progress}
              size={50}
              thickness={7}
            />
            {percentageComplete === 100 && (
              <Box
                sx={{
                  position: 'absolute',
                  marginTop: '-2.6em',
                  marginLeft: '0.75em',
                }}
              >
                <CheckIcon className={classes.fillIcon} />
              </Box>
            )}
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default CategoryListItem;
