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
  Toolbar,
  Typography,
  Theme,
} from '@mui/material';
import ChallengeContent from 'components/challenge/ChallengeContent';
import { useInView } from 'react-intersection-observer';
import { makeStyles } from '@mui/styles';
import { ChallengeData, Schedule } from 'types/challenges';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { getUser } from 'store/auth/selectors';
import { loadPostsForChallenge } from 'store/posts/operations';
import { getChallengePostList } from 'store/posts/selectors';
import ConfirmationModal from 'components/common/ConfirmationModal';
import LoadingPage from 'pages/loading/LoadingPage';
import { MapDialog } from 'components/map';
import { useIsDesktop } from 'utils/windowSize';
import { MAP_ROUTE } from 'routing/routes';

const useStyles = makeStyles<Theme>((theme) => ({
  white: {
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  fadeIn: {
    transform: 'translateY(0%)',
    transition: 'transform 0.5s',
  },
  fadeOut: {
    transform: 'translateY(100%)',
    transition: 'transform 0.5s',
  },
  joinButton: {
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    textTransform: 'none',
    '&:hover, &:focus': {
      backgroundColor: (challenge: ChallengeData) =>
        getComplementaryColor(challenge.color),
      color: 'black',
      transition: '0.5s ease',
    },
  },
  secondaryJoinButton: {
    marginTop: '3em',
    borderRadius: '2.5em 0 0 0',
    right: 0,
    padding: '1.2em 2em',
    position: 'fixed',
    bottom: 0,
    zIndex: 5,
    textTransform: 'none',
  },
  collapsedHeaderText: {
    color: 'white',
    fontSize: '1.3em',
    fontFamily: 'Frock',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    flex: 1,
  },
  addMarginTop: {
    marginTop: '1em',
  },
  desktopMargins: {
    borderRadius: '2em',
    overflow: 'hidden',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  content: {
    paddingLeft: '2em',
    marginTop: '1em',
  },
  desktopAppBar: {
    paddingTop: '1em',
  },
}));

interface ChallengeCompletedDialogState {
  isOpen: boolean;
  completedChallengeId?: number;
}

const ChallengeDetailsPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { challengeId } = useParams<{ challengeId: string }>();
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  const isDesktop = useIsDesktop();

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

  const classes = useStyles(challenge);

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
    <Box className={isDesktop ? classes.desktopMargins : ''}>
      <Stack
        sx={{
          backgroundColor: getHexCode(challenge.color),
        }}
      >
        <AppBar
          position="sticky"
          className={isDesktop ? classes.desktopAppBar : ''}
          sx={{
            backgroundColor: getHexCode(challenge.color),
            height: '4.1em',
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <IconButton
                edge="start"
                sx={{ color: 'white', padding: '1em' }}
                onClick={() => {
                  history.goBack();
                }}
              >
                <BackArrow height="1.5em" width="1.5em" />
              </IconButton>

              {!inView && (
                <Box className={classes.collapsedHeaderText}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      !inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {challenge.name}
                  </motion.div>
                </Box>
              )}

              <IconButton
                edge="end"
                color="primary"
                onClick={handleMenuClick}
                sx={{
                  color: 'white',
                  padding: '1em',
                  visibility: canForfeitChallenge ? undefined : 'hidden',
                }}
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
                    handleMenuClose();
                    history.push(`${MAP_ROUTE}/${userChallenge?.challengeId}`);
                  }}
                >
                  View Map
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsForfeitConfirmationModalOpen(true);
                    handleMenuClose();
                  }}
                >
                  Forfeit Challenge
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <motion.div
          ref={ref}
          initial={isDesktop ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={
            inView || isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Stack className={classes.content}>
            <Typography className={classes.white}>
              {!isEnrolled
                ? '👻 UNENROLLED'
                : !isChallengeCompleted
                ? '🔥 ONGOING'
                : '🎉 COMPLETED'}
            </Typography>
            <Typography variant="h1" className={classes.white}>
              {challenge.name}
            </Typography>
            <Typography className={`${classes.white} ${classes.bold}`}>
              {challenge.duration} days · Created by{' '}
              {challenge.originalCreator ?? challenge.createdBy}
            </Typography>

            {challenge.referenceLink && (
              <span>
                <Link
                  href={challenge.referenceLink}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.white}
                  underline="always"
                >
                  Learn more about this challenge
                </Link>
              </span>
            )}

            <Typography className={`${classes.white} ${classes.addMarginTop}`}>
              {challenge.description}
            </Typography>
            <Typography
              variant="h6"
              className={`${classes.white} ${classes.bold} ${classes.addMarginTop}`}
            >
              Recommended schedule
            </Typography>
            <Typography className={`${classes.white}`}>
              {challenge.schedule}
            </Typography>
          </Stack>

          <Stack
            alignItems="center"
            sx={{ marginTop: '2em', marginBottom: '2em' }}
          >
            {!isEnrolled && (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  className={classes.joinButton}
                  onClick={onClickJoinChallenge}
                >
                  <Typography variant="body1">Join Challenge!</Typography>
                </Button>
              </>
            )}
            {isEnrolled && (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  disableElevation
                  className={classes.joinButton}
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Typography variant="body1">Invite Your Friends!</Typography>
                </Button>
              </>
            )}
          </Stack>
        </motion.div>

        <ChallengeContent
          challenge={challenge}
          userChallenge={userChallenge}
          tasks={tasks}
          posts={posts}
          currentUser={user}
          isEnrolled={isEnrolled}
          isChallengeCompleted={isChallengeCompleted}
          onTaskCompleted={() => setIsMapDialogOpen(true)}
          onChallengeCompleted={onChallengeCompleted}
        />
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
      {!isEnrolled && (
        <>
          <Button
            variant="contained"
            disableElevation
            className={`${classes.secondaryJoinButton} ${
              !inView ? classes.fadeIn : classes.fadeOut
            }`}
            onClick={onClickJoinChallenge}
          >
            <Typography variant="body1">Join!</Typography>
          </Button>
        </>
      )}
    </Box>
  );
};

export default ChallengeDetailsPage;
