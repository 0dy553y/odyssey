import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useSpring } from 'react-spring';
import { Box } from '@mui/system';
import { loadChallenge } from 'store/challenges/operations';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from 'store/tasks/operations';
import { loadAllUserChallengesDataForChallenge } from 'store/userchallenges/operations';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import { getAllUserChallengesDataForChallenge } from 'store/userchallenges/selectors';
import CollapsedHeader from 'components/challenge/CollapsedHeader';
import { Skeleton } from '@mui/material';
import JoinChallengeButton from 'components/challenge/JoinChallengeButton';
import ChallengeContent from 'components/challenge/ChallengeContent';

interface ChallengeCompletedModalState {
  isOpen: boolean;
  completedChallengeName?: string;
}

const ChallengeDetailsPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(loadChallenge(Number(challengeId)));
      dispatch(loadAllTasks(Number(challengeId)));
      dispatch(loadAllUserChallengesDataForChallenge(Number(challengeId)));
    });
  }, []);

  const { challengeId } = useParams<{ challengeId: string }>();

  const challenge = useSelector((state: RootState) =>
    getChallenge(state, Number(challengeId))
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tasks = useSelector((state: RootState) =>
    getTaskList(state, Number(challengeId))
  )!;

  const userChallenges = useSelector((state: RootState) =>
    getAllUserChallengesDataForChallenge(state, Number(challengeId))
  );

  const userChallenge =
    userChallenges.length === 0
      ? undefined
      : userChallenges[userChallenges.length - 1];

  const [{ y }, setY] = useSpring(() => ({ y: 0 }));

  if (!challenge) {
    return <Skeleton />;
  }

  return (
    <Box>
      <CollapsedHeader name={challenge.name} />
      <JoinChallengeButton />
      <ChallengeContent
        challenge={challenge}
        userChallenge={userChallenge}
        tasks={tasks}
        userTasks={userChallenge?.userTasks ?? []}
        y={y}
        setY={setY}
      />
    </Box>
  );
};

export default ChallengeDetailsPage;
