import React, { useEffect, useReducer, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { joinChallenge, loadChallenge } from 'store/challenges/operations';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from 'store/tasks/operations';
import { loadAllUserChallengesDataForChallenge } from 'store/userchallenges/operations';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import { getAllUserChallengesDataForChallenge } from 'store/userchallenges/selectors';
import CollapsedHeader from 'components/challenge/CollapsedHeader';
import { AppBar, Button, IconButton, Skeleton, Toolbar } from '@mui/material';
import ScheduleModal from './ScheduleModal';
import ChallengeContent from 'components/challenge/ChallengeContent';
import { makeStyles } from '@mui/styles';
import { Schedule } from 'types/challenges';
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
}));

interface ChallengeCompletedModalState {
  isOpen: boolean;
  completedChallengeName?: string;
}

const ChallengeDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isScheduleModalOpen, setIsScheduleModalOpen] =
    useState<boolean>(false);
  const [challengeCompletedModalState, setChallengeCompletedModalState] =
    useReducer(
      (
        state: ChallengeCompletedModalState,
        newState: Partial<ChallengeCompletedModalState>
      ) => ({
        ...state,
        ...newState,
      }),
      { isOpen: false, completedChallengeName: undefined }
    );

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

  const isEnrolled = !!userChallenge;
  const isChallengeCompleted = isEnrolled && !!userChallenge.completedAt;

  const Bar = () => (
    <AppBar position="static">
      <Toolbar>
        <div
          onClick={() => {
            history.goBack();
          }}
        >
          <IconButton edge="start" className={classes.white}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Box className={classes.spacer} />
      </Toolbar>
    </AppBar>
  );

  if (!challenge) {
    return <Skeleton />;
  }

  return (
    <Box>
      <CollapsedHeader name={challenge.name} />
      {!isEnrolled && (
        <>
          <Button
            variant="contained"
            fullWidth
            disableElevation
            className={classes.joinButton}
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <Typography variant="body1">Join Challenge!</Typography>
          </Button>
          <ScheduleModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            onSubmit={(schedule: Schedule) =>
              dispatch(joinChallenge(Number(challengeId), schedule))
            }
          />
        </>
      )}
      <ChallengeContent
        challenge={challenge}
        userChallenge={userChallenge}
        tasks={tasks}
        userTasks={userChallenge?.userTasks ?? []}
      />
    </Box>
  );
};

export default ChallengeDetailsPage;
