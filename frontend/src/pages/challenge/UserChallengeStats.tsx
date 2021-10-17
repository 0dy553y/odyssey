import React from 'react';
import ChallengeProgressChart from 'components/challengeProgressChart';
import { useTheme } from '@mui/styles';
import { Box, Divider, Grid, Stack, Theme, Typography } from '@mui/material';
import { UserTaskListData } from 'types/usertasks';
import RecurringDaysForm from 'components/recurringDaysForm';
import { Schedule } from 'types/challenges';

import './UserChallengeStats.scss';

interface UserChallengeStatsProps {
  percentCompleted: number;
  enrolledDate: Date;
  completedTasks: UserTaskListData[];
  totalNumberOfTasks: number;
  schedule: Schedule;
}

const UserChallengeStats: React.FC<UserChallengeStatsProps> = ({
  percentCompleted,
  enrolledDate,
  completedTasks,
  totalNumberOfTasks,
  schedule,
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

      <RecurringDaysForm isEditable={false} initialSchedule={schedule} />

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
      </Grid>

      <Typography component="div" variant="h6">
        Progress Chart
      </Typography>
      <ChallengeProgressChart
        height={220}
        color={theme.palette.primary.main}
        data={completedTasks.map((task) => {
          if (!task.completedAt) {
            throw new Error('Completed task must have a completedAt date');
          }
          return {
            taskCompletionDate: task.completedAt,
            taskIndex: task.taskIndex,
          };
        })}
        totalNumberOfTasks={totalNumberOfTasks}
        challengeEnrolledDate={enrolledDate}
      />
    </Box>
  );
};

export default UserChallengeStats;
