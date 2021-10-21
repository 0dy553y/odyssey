import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { loadChallenge } from 'store/challenges/operations';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from 'store/tasks/operations';
import { loadOngoingUserChallengeDataForChallenge } from 'store/userchallenges/operations';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import { getOngoingUserChallengeData } from 'store/userchallenges/selectors';
import CollapsedHeader from 'components/challenge/CollapsedHeader';
import { Skeleton } from '@mui/material';
import JoinChallengeButton from 'components/challenge/JoinChallengeButton';
import ChallengeContent from 'components/challenge/ChallengeContent';

const ChallengeDetailsPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChallenge(Number(challengeId)));
    dispatch(loadAllTasks(Number(challengeId)));
    dispatch(loadOngoingUserChallengeDataForChallenge(Number(challengeId)));
  }, []);

  const { challengeId } = useParams<{ challengeId: string }>();

  const challenge = useSelector((state: RootState) =>
    getChallenge(state, Number(challengeId))
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tasks = useSelector((state: RootState) =>
    getTaskList(state, Number(challengeId))
  )!;

  const userChallenge = useSelector((state: RootState) =>
    getOngoingUserChallengeData(state, Number(challengeId))
  );

  if (!challenge) {
    return <Skeleton />;
  }

  return (
    <Box>
      <CollapsedHeader name={challenge.name} />
      <JoinChallengeButton />
      <ChallengeContent
        challenge={challenge}
        tasks={tasks}
        userTasks={userChallenge?.userTasks ?? []}
      />
    </Box>
  );
};

export default ChallengeDetailsPage;
