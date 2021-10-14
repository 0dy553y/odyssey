import React from 'react';
import ChallengeProgressChart from 'components/challengeProgressChart';
import { useTheme } from '@mui/styles';
import { Theme } from '@mui/material';
import { add, sub } from 'date-fns';

interface UserChallengeStatsProps {
  TODO?: string;
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

const UserChallengeStats: React.FC<UserChallengeStatsProps> = (props) => {
  const theme: Theme = useTheme();
  return (
    <ChallengeProgressChart
      height={220}
      color={theme.palette.primary.main}
      {...mockChallengeProgressChartProps}
    />
  );
};

export default UserChallengeStats;
