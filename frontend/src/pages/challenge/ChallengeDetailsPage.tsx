import React, { useState, useEffect, useReducer } from 'react';
import { loadChallenge } from 'store/challenges/operations';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from 'store/tasks/operations';
import {
  forfeitUserChallenge,
  loadAllUserChallengesDataForChallenge,
} from 'store/userchallenges/operations';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import {
  getOngoingOrCompletedUserChallengeDataForChallenge,
  getChallengeMap,
} from 'store/userchallenges/selectors';
import { UserChallengeListData } from 'types/userchallenge';
import { loadAllOngoingUserChallenges } from 'store/userchallenges/operations';
import { motion } from 'framer-motion';
import { getAllOngoingUserChallenges } from '../../store/userchallenges/selectors';
import ScheduleModal from 'components/challenge/ScheduleModal';
import ShareDialog from 'components/challenge/ShareDialog';
import { joinChallenge } from 'store/challenges/operations';
import { addSnackbar } from '../../store/snackbars/actions';
import ChallengeCompletedDialog from 'components/challengeCompletedDialog';
import { getHexCode, getComplementaryColor } from 'utils/color';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import ChallengeContent from 'components/challenge/ChallengeContent';
import { useInView } from 'react-intersection-observer';
import { useTheme, makeStyles } from '@mui/styles';
import { ChallengeData, Schedule } from 'types/challenges';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { getUser } from 'store/auth/selectors';
import { loadPostsForChallenge } from 'store/posts/operations';
import { getChallengePostList } from 'store/posts/selectors';
import ConfirmationModal from 'components/common/ConfirmationModal';
import LoadingPage from 'pages/loading/LoadingPage';
import { MapDialog } from 'components/map';

const useStyles = makeStyles(() => ({
  menuIcon: {
    position: 'fixed',
    zIndex: 5,
    color: 'white',
    top: '0.45em',
    right: '1.5em',
  },
}));

interface ChallengeCompletedDialogState {
  isOpen: boolean;
  completedChallengeId?: number;
}

const ChallengeDetailsPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { challengeId } = useParams<{ challengeId: string }>();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!;
  const tasks = useSelector((state: RootState) =>
    getTaskList(state, Number(challengeId))
  );
  const challenge = useSelector((state: RootState) =>
    getChallenge(state, Number(challengeId))
  );
  const userChallenge = useSelector((state: RootState) =>
    getOngoingOrCompletedUserChallengeDataForChallenge(
      state,
      Number(challengeId)
    )
  );
  const challengeMap = useSelector((state: RootState) =>
    getChallengeMap(state, Number(challengeId))
  );
  const posts = useSelector((state: RootState) =>
    getChallengePostList(state, Number(challengeId))
  );
  const ongoingChallenges: UserChallengeListData[] = useSelector(
    (state: RootState) => getAllOngoingUserChallenges(state)
  );

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const [isForfeitConfirmationModalOpen, setIsForfeitConfirmationModalOpen] =
    useState<boolean>(false);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState<boolean>(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] =
    useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [challengeCompletedDialogState, setChallengeCompletedDialogState] =
    useReducer(
      (
        state: ChallengeCompletedDialogState,
        newState: Partial<ChallengeCompletedDialogState>
      ) => ({
        ...state,
        ...newState,
      }),
      { isOpen: false, completedChallengeId: undefined }
    );

  useEffect(() => {
    batch(() => {
      dispatch(loadChallenge(Number(challengeId)));
      dispatch(loadAllTasks(Number(challengeId)));
      dispatch(loadAllUserChallengesDataForChallenge(Number(challengeId)));
      dispatch(loadPostsForChallenge(Number(challengeId)));
      dispatch(loadAllOngoingUserChallenges());
    });
  }, []);

  const isEnrolled = !!userChallenge;
  const isChallengeCompleted = isEnrolled && !!userChallenge.completedAt;
  const canForfeitChallenge =
    // (1) Must be enrolled in the challenge
    // (2) Challenge must not already be completed
    // (3) Challenge must not already be forfeited
    !!userChallenge && !userChallenge.completedAt && !userChallenge.forfeitedAt;

  const handleJoinChallenge = (schedule: Schedule) => {
    let hasOneTrue = false;
    Object.values(schedule).forEach((bool) => {
      hasOneTrue = hasOneTrue || bool;
    });
    if (!hasOneTrue) {
      dispatch(
        addSnackbar({
          message: `Schedule cannot be empty`,
          variant: 'error',
        })
      );
      return;
    }
    dispatch(joinChallenge(Number(challengeId), schedule));
    setIsScheduleModalOpen(false);
  };

  const onClickJoinChallenge = () => {
    if (ongoingChallenges.length >= 3) {
      dispatch(
        addSnackbar({
          message: `Can only join maximum 3 challenges at a time`,
          variant: 'error',
        })
      );
      return;
    }
    setIsScheduleModalOpen(true);
  };

  const onChallengeCompleted = (completedChallengeId: number) => {
    setChallengeCompletedDialogState({
      isOpen: true,
      completedChallengeId: completedChallengeId,
    });
  };

  if (!challenge) {
    return <LoadingPage />;
  }

  return (
    <Box>
      <Stack
        sx={{
          backgroundColor: getHexCode(challenge.color),
          height: '40vh',
        }}
        justifyContent="space-between"
      >
        <AppBar position="static">
          <Toolbar>
            <Box
              onClick={() => {
                history.goBack();
              }}
            >
              <IconButton edge="start" sx={{ color: 'white', padding: '1em' }}>
                <BackArrow height="1.5em" width="1.5em" />
              </IconButton>
            </Box>

            {canForfeitChallenge && (
              <>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={handleMenuClick}
                  className={classes.menuIcon}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      setIsForfeitConfirmationModalOpen(true);
                      handleMenuClose();
                    }}
                  >
                    Forfeit Challenge
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Stack>

      {canForfeitChallenge && (
        <ConfirmationModal
          title="Forfeit challenge"
          message="Are you sure? All your existing progress will be gone."
          isOpen={isForfeitConfirmationModalOpen}
          onConfirm={() => {
            if (!userChallenge) {
              throw new Error(
                'Should not be able to forfeit challenge if user is not enrolled'
              );
            }
            dispatch(
              forfeitUserChallenge(userChallenge.id, userChallenge.challengeId)
            );
            setIsForfeitConfirmationModalOpen(false);
          }}
          onCancel={() => setIsForfeitConfirmationModalOpen(false)}
        />
      )}
      {challengeMap && (
        <MapDialog
          isOpen={isMapDialogOpen}
          close={() => setIsMapDialogOpen(false)}
          mapData={challengeMap}
        />
      )}
      {!isEnrolled && (
        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSubmit={handleJoinChallenge}
          numOngoingChallenges={ongoingChallenges.length}
        />
      )}
      {isEnrolled && (
        <ShareDialog
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          challenge={challenge}
        />
      )}
      {challengeCompletedDialogState.completedChallengeId && (
        <ChallengeCompletedDialog
          isOpen={challengeCompletedDialogState.isOpen}
          challengeId={1}
          onClose={() => {
            setChallengeCompletedDialogState({ isOpen: false });
          }}
        />
      )}
    </Box>
  );
};

export default ChallengeDetailsPage;
