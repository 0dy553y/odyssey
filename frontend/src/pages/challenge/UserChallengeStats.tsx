import React from 'react';
import ChallengeProgressChart from 'components/challengeProgressChart';
import { useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

interface UserChallengeStatsProps {
  TODO?: string;
}

const UserChallengeStats: React.FC<UserChallengeStatsProps> = (props) => {
  const theme: Theme = useTheme();
  return (
    <ChallengeProgressChart height={220} color={theme.palette.primary.main} />
  );
};

export default UserChallengeStats;
