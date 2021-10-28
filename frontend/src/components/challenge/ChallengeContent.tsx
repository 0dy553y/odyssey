import React, { useReducer, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Skeleton, Typography, Tab } from '@mui/material';
import { TaskListData } from 'types/tasks';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChallengeData, Schedule } from 'types/challenges';
import { getHexCode } from 'utils/color';
import UserChallengeStats from 'components/challenge/UserChallengeStats';
import { UserChallengeData } from 'types/userchallenge';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import ChallengeMilestones from 'components/challenge/ChallengeMilestones';
import ChallengeCompletedModal from 'components/challengeCompletedModal';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScheduleModal from 'components/challenge/ScheduleModal';
import { joinChallenge } from 'store/challenges/operations';

const useStyles = makeStyles(() => ({
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
    padding: '60px 2.5em 60px 2.5em',
  },
  tabs: {
    padding: '0.5em 0 0 2em',
    backgroundColor: '#f5f7f9',
    position: 'sticky',
    zIndex: 1,
    top: '4em',
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
}

interface ChallengeContentProps {
  challenge: ChallengeData;
  userChallenge: UserChallengeData | undefined;
  tasks: TaskListData[];
}

interface ChallengeCompletedModalState {
  isOpen: boolean;
  completedChallengeName?: string;
}

const privateTabs = [TabItem.YourStats];

const ChallengeContent: React.FC<ChallengeContentProps> = (props) => {
  const { challenge, userChallenge, tasks } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const isEnrolled = !!userChallenge;
  const isChallengeCompleted = isEnrolled && !!userChallenge.completedAt;

  const { challengeId } = useParams<{ challengeId: string }>();

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

  const [ref, inView] = useInView({
    threshold: 0.3,
  });

  const onChallengeCompleted = (completedChallengeName: string) => {
    setChallengeCompletedModalState({
      isOpen: true,
      completedChallengeName: completedChallengeName,
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
          />
        );
      case TabItem.YourStats:
        if (!userChallenge) {
          return <Skeleton />;
        }
        return (
          <UserChallengeStats
            percentCompleted={userChallenge.percentCompleted}
            enrolledDate={userChallenge.enrolledDate}
            completedTasks={userChallenge.userTasks.filter(
              (userTask) => userTask.completedAt !== null
            )}
            totalNumberOfTasks={tasks.length}
            schedule={userChallenge.schedule}
          />
        );
      default:
        throw new Error('Unknown tab item!');
    }
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
                {challenge.duration} days · Created by {challenge.createdBy}
              </Typography>
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
                  if (privateTabs.includes(tabItem) && !userChallenge) {
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
        {challengeCompletedModalState.completedChallengeName && (
          <ChallengeCompletedModal
            isOpen={challengeCompletedModalState.isOpen}
            challengeName={challengeCompletedModalState.completedChallengeName}
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
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <Typography variant="body1">Join!</Typography>
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
    </Box>
  );
};

export default ChallengeContent;