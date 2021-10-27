import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { loadChallenge } from 'store/challenges/operations';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from 'store/tasks/operations';
import { loadAllUserChallengesDataForChallenge } from 'store/userchallenges/operations';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import { getAllUserChallengesDataForChallenge } from 'store/userchallenges/selectors';
import { IconButton, Skeleton } from '@mui/material';
import ChallengeContent from 'components/challenge/ChallengeContent';
import { makeStyles } from '@mui/styles';
import { ChevronLeft } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  joinButton: {
    marginTop: '28px',
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    left: '50%',
    transform: 'translateX(-50%) translateY(280px)',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    textTransform: 'none',
  },
  white: {
    color: 'white',
  },
  spacer: {
    flexGrow: 1,
  },
  backIcon: {
    position: 'fixed',
    zIndex: 5,
    color: 'white',
    top: '0.45em',
    left: '0.5em',
  },
}));

const ChallengeDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
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

  if (!challenge) {
    return <Skeleton />;
  }

  return (
    <Box>
      <Box
        onClick={() => {
          history.goBack();
        }}
      >
        <IconButton edge="start" className={classes.backIcon}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <ChallengeContent
        challenge={challenge}
        userChallenge={userChallenge}
        tasks={tasks}
      />
    </Box>
  );
};

export default ChallengeDetailsPage;
