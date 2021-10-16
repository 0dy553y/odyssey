import React from 'react';
import ChallengeProgressChart from 'components/challengeProgressChart';
import { useTheme } from '@mui/styles';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  FormGroup,
  Theme,
  Typography,
} from '@mui/material';
import { add, sub } from 'date-fns';
import { DayOfWeek } from 'types/date';

import './UserChallengeStats.scss';

interface UserChallengeStatsProps {
  percentCompleted: number;
  currentStreak: number;
  longestStreak: number;
}

const mockChallengeEnrolledDate = sub(new Date(), { months: 1 });
const mockFirstTaskDate = add(mockChallengeEnrolledDate, { days: 3 });
const mockChallengeProgressChartProps = {
  data: Array.from(Array(6).keys()).map((i) => {
    return {
      taskCompletionDate: add(mockFirstTaskDate, { days: i * 3 }),
      taskIndex: i,
    };
  }),
  totalNumberOfTasks: 10,
  challengeEnrolledDate: mockChallengeEnrolledDate,
};

const UserChallengeStats: React.FC<UserChallengeStatsProps> = ({
  percentCompleted,
  currentStreak,
  longestStreak,
}) => {
  const theme: Theme = useTheme();

  const statsLabel = (
    valueLabel: string,
    description: string,
    valueClassName?: string
  ) => (
    <>
      <Typography
        component="div"
        variant="h5"
        className={`stats-value-label ${valueClassName}`}
      >
        {valueLabel}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        className="stats-description-label"
      >
        {description}
      </Typography>
    </>
  );

  return (
    <Box className="user-challenge-stats">
      <Typography component="div" variant="h6">
        Recurring days
      </Typography>

      <FormControl component="fieldset" className="day-checkbox-container">
        <FormGroup>
          <Stack direction="row" justifyContent="space-between" spacing={0}>
            {Object.values(DayOfWeek).map((day) => (
              <FormControlLabel
                key={day}
                value={day}
                control={<Checkbox />}
                label={day[0]}
                labelPlacement="top"
                className={'day-checkbox'}
              />
            ))}
          </Stack>
        </FormGroup>
      </FormControl>

      <Divider className="divider" />

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Stack>
            {statsLabel(
              `${percentCompleted.toFixed(1)}%`,
              'complete',
              'big-label'
            )}
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack>
            {statsLabel(`${currentStreak}`, 'days in a row')}
            {statsLabel(`${longestStreak}`, 'longest streak')}
          </Stack>
        </Grid>
      </Grid>

      <Typography component="div" variant="h6">
        Progress Chart
      </Typography>
      <ChallengeProgressChart
        height={220}
        color={theme.palette.primary.main}
        {...mockChallengeProgressChartProps}
      />
    </Box>
  );
};

export default UserChallengeStats;
