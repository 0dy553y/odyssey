import React from 'react';
import { Grid, Typography } from '@mui/material';
import { displayDate, displayDuration } from 'utils/formatting';
import { Duration } from 'date-fns';

interface UserStatsProps {
  registrationDate: Date;
  challengesCompleted: number;
  longestStreakDuration: Duration;
}

const UserStats: React.FC<UserStatsProps> = ({
  registrationDate,
  challengesCompleted,
  longestStreakDuration,
}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography component="div" variant="h6">
          Stats
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="div" variant="body1">
          Challenger since {displayDate(registrationDate)}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="div" variant="body1">
          Completed: {challengesCompleted}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="div" variant="body1">
          Longest streak: {displayDuration(longestStreakDuration)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserStats;
