import React from 'react';
import { makeStyles } from '@mui/styles';
import CheckIcon from '@mui/icons-material/CheckRounded';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import { getFormattedStringFromDays } from 'utils/formatting';
import { Typography, Theme } from '@mui/material';
import Avatar from 'boring-avatars';

import './CategoryListItem.scss';

const useStyles = makeStyles((theme: Theme) => ({
  innerRing: {
    position: 'absolute',
    top: '-3%',
  },
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0 2em 0',
  },
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerRing: {
    transition: '4s ease',
    transitionDelay: '4s',
    position: 'absolute',
    top: '-3%',
  },
  fillIcon: {
    fill: theme.palette.primary.main,
    transform: 'translateY(-0.1em)',
  },
  handCursor: {
    cursor: 'pointer',
  },
}));

interface CategoryListProps {
  name: string;
  duration: number;
  percentageComplete: number | null;
  onClick: () => void;
}

const CategoryListItem: React.FC<CategoryListProps> = (props) => {
  const { name, duration, percentageComplete, onClick } = props;
  const classes = useStyles();

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(percentageComplete ?? 0);
  }, []);

  return (
    <Box onClick={onClick} className={classes.handCursor}>
      <div className={classes.container}>
        <div className="square-pic">
          <Avatar
            square={true}
            variant={'beam'}
            size={68}
            name={name}
            colors={[
              '#B17B9C',
              '#CC871F',
              '#3CA195',
              '#2B2A5E',
              '#9F88E3',
              '#3836A6',
            ]}
          />
        </div>
        <Grid item xs={9}>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Typography component="div" variant="body1">
            {getFormattedStringFromDays(duration)}
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.circularProgress}>
          <CircularProgress
            color="primary"
            variant="determinate"
            sx={{
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
              },
              marginTop: '0.5em',
              opacity: percentageComplete === null ? 0 : 0.3,
            }}
            value={100}
            size={50}
            thickness={7}
            className={classes.innerRing}
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
            className={classes.outerRing}
            value={progress}
            size={50}
            thickness={7}
          />
          {percentageComplete === 100 && (
            <CheckIcon className={classes.fillIcon} />
          )}
        </Grid>
      </div>
    </Box>
  );
};

export default CategoryListItem;
