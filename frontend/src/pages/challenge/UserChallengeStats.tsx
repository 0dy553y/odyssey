import React from 'react';
import ChallengeProgressChart from 'components/challengeProgressChart';
import { useTheme } from '@mui/styles';
import { Theme } from '@mui/material';
import { sub } from 'date-fns';

interface UserChallengeStatsProps {
  TODO?: string;
}

const mockChallengeProgressChartProps = {
  data: Array.from(Array(6).keys()).map((i) => {
    return {
      taskCompletionDate: sub(sub(new Date(), { days: 5 }), { days: 6 - i }),
      taskIndex: i,
    };
  }),
  totalNumberOfTasks: 10,
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
