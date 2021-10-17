import React from 'react';
import { Grid, Typography } from '@mui/material';
import { displayDate } from 'utils/formatting';

interface UserStatsProps {
  registrationDate: Date;
  challengesCompleted: number;
}

const UserStats: React.FC<UserStatsProps> = ({
  registrationDate,
  challengesCompleted,
}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography component="div" variant="h5">
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
          Completed challenges: {challengesCompleted}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserStats;
