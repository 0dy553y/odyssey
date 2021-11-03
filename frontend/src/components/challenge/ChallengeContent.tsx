import React, { useReducer, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Link, Theme, Typography, Tab } from '@mui/material';
import { TaskListData } from 'types/tasks';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChallengeData, Schedule } from 'types/challenges';
import { getHexCode, getComplementaryColor } from 'utils/color';
import UserChallengeStats from 'components/challenge/UserChallengeStats';
import { UserChallengeData, UserChallengeListData } from 'types/userchallenge';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import ChallengeMilestones from 'components/challenge/ChallengeMilestones';
import ChallengeCompletedModal from 'components/challengeCompletedModal';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScheduleModal from 'components/challenge/ScheduleModal';
import { joinChallenge } from 'store/challenges/operations';
import { MemoizedFeedPostList } from 'components/feed/FeedPostList';
import { UserData } from 'types/auth';
import { addSnackbar } from '../../store/snackbars/actions';
import { getAllOngoingUserChallenges } from '../../store/userchallenges/selectors';
import LoadingPage from 'pages/loading/LoadingPage';
import {
  addReactionToPost,
  removeReactionFromPost,
} from 'store/posts/operations';
import { PostListData, ReactionEmoji } from 'types/posts';
import ShareDialog from './ShareDialog';
import { RootState } from 'store';
import { loadAllOngoingUserChallenges } from 'store/userchallenges/operations';

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    scrollbarWidth: 'none',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: '0 -50vw 1em -50vw',
    minWidth: '100vw',
    left: '50%',
    right: '50%',
    width: '100vw',
  },
  contentDetails: {
    padding: '1em 0.5em',
    borderRadius: '2em 2em 0 0',
    backgroundColor: '#f5f7f9',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  headerText: {
    color: 'white',
  },
  expandedHeaderTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'left',
    padding: '80px 2.5em 60px 2.5em',
  },
  tabs: {
    top: '4em',
    backgroundColor: '#f5f7f9',
    position: 'sticky',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '1em',
      justifyContent: 'flex-start',
    },
  },
  white: {
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  topPadding: {
    paddingTop: '1.5em',
  },
  removeMargin: {
    marginBottom: '-0.5em',
  },
  fadeIn: {
    transform: 'translateY(0%)',
    transition: 'transform 0.5s',
  },
  fadeOut: {
    transform: 'translateY(100%)',
    transition: 'transform 0.5s',
  },
  collapsedHeader: {
    height: '4em',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    verticalAlign: 'middle',
    padding: '10px',
  },
  collapsedHeaderText: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.3em',
    fontFamily: 'Frock',
    textOverflow: 'ellipsis',
  },
  joinButton: {
    marginTop: '3em',
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    left: '50%',
    transform: 'translateX(-50%)',
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
}));

enum TabItem {
  Milestones = 'Milestones',
  YourStats = 'Your Stats',
  Community = 'Community',
}

interface ChallengeContentProps {
  challenge: ChallengeData;
  userChallenge: UserChallengeData | undefined;
  tasks: TaskListData[];
  posts: PostListData[];
  currentUser: UserData;
  onTaskCompleted: () => void;
}

interface ChallengeCompletedModalState {
  isOpen: boolean;
  completedChallengeId?: number;
}

const privateTabs = [TabItem.YourStats];

const ChallengeContent: React.FC<ChallengeContentProps> = (props) => {
  const {
    challenge,
    userChallenge,
    tasks,
    posts,
    currentUser,
    onTaskCompleted,
  } = props;
  const classes = useStyles(challenge);
  const dispatch = useDispatch();

  const isEnrolled = !!userChallenge;
  const isChallengeCompleted = isEnrolled && !!userChallenge.completedAt;

  const { challengeId } = useParams<{ challengeId: string }>();

  useEffect(() => {
    dispatch(loadAllOngoingUserChallenges());
  }, []);

  const [isScheduleModalOpen, setIsScheduleModalOpen] =
    useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [challengeCompletedModalState, setChallengeCompletedModalState] =
    useReducer(
      (
        state: ChallengeCompletedModalState,
        newState: Partial<ChallengeCompletedModalState>
      ) => ({
        ...state,
        ...newState,
      }),
      { isOpen: false, completedChallengeId: undefined }
    );

  const ongoingChallenges: UserChallengeListData[] = useSelector(
    (state: RootState) => getAllOngoingUserChallenges(state)
  );

  const [ref, inView] = useInView({
    threshold: 0.3,
  });

  const onChallengeCompleted = (completedChallengeId: number) => {
    setChallengeCompletedModalState({
      isOpen: true,
      completedChallengeId: completedChallengeId,
    });
  };

  const [currentTabItem, setCurrentTabItem] = useState<TabItem>(
    TabItem.Milestones
  );

  const tabPanelRenderer = (tabItem: TabItem) => {
    switch (tabItem) {
      case TabItem.Milestones:
        return (
          <ChallengeMilestones
            tasks={tasks}
            userTasks={userChallenge?.userTasks ?? []}
            onChallengeCompleted={onChallengeCompleted}
            onTaskCompleted={onTaskCompleted}
          />
        );
      case TabItem.YourStats:
        if (!userChallenge) {
          return <LoadingPage />;
        }
        return (
          <UserChallengeStats
            percentCompleted={userChallenge.percentCompleted}
            enrolledDate={userChallenge.enrolledDate}
            completedTasks={userChallenge.userTasks.filter(
              (userTask) => !!userTask.completedAt
            )}
            totalNumberOfTasks={tasks.length}
            schedule={userChallenge.schedule}
          />
        );
      case TabItem.Community:
        return (
          <Box>
            <MemoizedFeedPostList
              posts={posts}
              currentUserId={currentUser.id}
              addReaction={(reaction: ReactionEmoji, post: PostListData) => {
                dispatch(addReactionToPost(post.id, reaction));
              }}
              removeReaction={(reaction: ReactionEmoji, post: PostListData) => {
                dispatch(removeReactionFromPost(post.id, reaction));
              }}
              shouldLinkToChallenge={false}
            />
          </Box>
        );
      default:
        throw new Error('Unknown tab item!');
    }
  };

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

  return (
    <Box>
      {!inView && (
        <div
          className={classes.collapsedHeader}
          style={{ backgroundColor: getHexCode(challenge.color) }}
        >
          <span className={classes.collapsedHeaderText}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={!inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {challenge.name}
            </motion.div>
          </span>
        </div>
      )}
      <div
        className={classes.contentContainer}
        style={{ backgroundColor: getHexCode(challenge.color) }}
      >
        <div
          className={classes.headerContainer}
          style={{ backgroundColor: getHexCode(challenge.color) }}
        >
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={classes.expandedHeaderTextContainer}>
              <Typography className={classes.white}>
                {!isEnrolled
                  ? '👻 UNENROLLED'
                  : !isChallengeCompleted
                  ? '🔥 ONGOING'
                  : '🎉 COMPLETED'}
              </Typography>
              <Typography variant="h1" className={classes.headerText}>
                {challenge.name}
              </Typography>
              <Typography className={`${classes.white} ${classes.bold}`}>
                {challenge.duration} days · Created by{' '}
                {challenge.originalCreator ?? challenge.createdBy}
              </Typography>

              {challenge.referenceLink && (
                <Link
                  href={challenge.referenceLink}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.white}
                  underline="always"
                >
                  Learn more about this challenge
                </Link>
              )}

              <Typography className={`${classes.white} ${classes.topPadding}`}>
                {challenge.description}
              </Typography>
              <Typography
                variant="h6"
                className={`${classes.white} ${classes.topPadding} ${classes.bold}`}
              >
                Recommended schedule
              </Typography>
              <Typography
                className={`${classes.white} ${classes.removeMargin}`}
              >
                {challenge.schedule}
              </Typography>
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
                  <ScheduleModal
                    isOpen={isScheduleModalOpen}
                    onClose={() => setIsScheduleModalOpen(false)}
                    onSubmit={handleJoinChallenge}
                    numOngoingChallenges={ongoingChallenges.length}
                  />
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
                    <Typography variant="body1">
                      Invite Your Friends!
                    </Typography>
                  </Button>
                  <ShareDialog
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    challenge={challenge}
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
        <div className={classes.contentDetails}>
          <TabContext value={currentTabItem}>
            <Box className={classes.tabs}>
              <TabList
                onChange={(_: React.SyntheticEvent, newValue: TabItem) => {
                  setCurrentTabItem(newValue);
                }}
              >
                {Object.values(TabItem).map((tabItem) => {
                  if (privateTabs.includes(tabItem) && !isEnrolled) {
                    if (currentTabItem === tabItem) {
                      setCurrentTabItem(TabItem.Milestones);
                    }
                    return null;
                  }
                  return <Tab key={tabItem} label={tabItem} value={tabItem} />;
                })}
              </TabList>
            </Box>

            {Object.values(TabItem).map((tabItem) => (
              <TabPanel key={tabItem} value={tabItem}>
                {tabPanelRenderer(tabItem)}
              </TabPanel>
            ))}
          </TabContext>
        </div>
        {challengeCompletedModalState.completedChallengeId && (
          <ChallengeCompletedModal
            isOpen={challengeCompletedModalState.isOpen}
            challengeId={1}
            onClose={() => {
              setChallengeCompletedModalState({ isOpen: false });
            }}
          />
        )}
      </div>
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
          <ScheduleModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            onSubmit={handleJoinChallenge}
            numOngoingChallenges={ongoingChallenges.length}
          />
        </>
      )}
    </Box>
  );
};

export default ChallengeContent;
