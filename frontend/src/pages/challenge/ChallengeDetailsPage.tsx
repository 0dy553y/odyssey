import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Box,
  Typography,
  SwipeableDrawer,
  Skeleton,
  Tab,
  IconButton,
  Toolbar,
  Paper,
} from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { ChevronLeft, MoreVert } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { ChallengeData, Schedule } from 'types/challenges';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import UserChallengeStats from './UserChallengeStats';
import ChallengeMilestones from './ChallengeMilestones';
import ScheduleModal from './ScheduleModal';
import { joinChallenge, loadChallenge } from 'store/challenges/operations';
import { loadAllTasks } from 'store/tasks/operations';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import { loadOngoingUserChallengeDataForChallenge } from 'store/userchallenges/operations';
import { getOngoingUserChallengeData } from 'store/userchallenges/selectors';
import { getHexCode } from 'utils/color';

export interface ChallengeDetailsPageProps {
  challenge: ChallengeData;
}

const useStyles = makeStyles(() => ({
  paper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100vh',
  },
  spacer: {
    flexGrow: 1,
  },
  drawer: {
    overflow: 'visible',
  },
  peekDrawer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    visibility: 'visible',
    right: 0,
    left: 0,
  },
  puller: {
    width: 100,
    height: 6,
    backgroundColor: 'white',
    opacity: '80%',
    borderRadius: 3,
    position: 'absolute',
    left: 'calc(50% - 45px)',
    top: '-14px',
  },
  white: {
    color: 'white',
  },
  joinButton: {
    marginTop: '28px',
    borderRadius: '20px',
    height: '60px',
  },
  tabPanel: {
    overflowY: 'scroll',
    height: '75vh',
  },
}));

enum TabItem {
  Milestones = 'Milestones',
  YourStats = 'Your Stats',
}

const privateTabs = [TabItem.YourStats];

const ChallengeDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isScheduleModalOpen, setIsScheduleModalOpen] =
    useState<boolean>(false);

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTabItem, setCurrentTabItem] = useState<TabItem>(
    TabItem.Milestones
  );

  const peekDrawerHeight = 200;

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
        <IconButton className={classes.white}>
          <MoreVert />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const tabPanelRenderer = (tabItem: TabItem) => {
    switch (tabItem) {
      case TabItem.Milestones:
        return (
          <ChallengeMilestones
            tasks={tasks}
            userTasks={userChallenge?.userTasks ?? []}
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

  if (!challenge) {
    return <Skeleton />;
  }

  return (
    <Paper
      className={classes.paper}
      sx={{ backgroundColor: getHexCode(challenge.color) }}
    >
      <Bar />
      <Box sx={{ marginLeft: '28px', marginRight: '28px' }}>
        <Typography className={classes.white}>
          {!!userChallenge ? '🔥 ONGOING' : '👻 UNENROLLED'}
        </Typography>
        <Typography variant="h1" className={classes.white}>
          {challenge.name}
        </Typography>
        <Typography className={classes.white}>
          {challenge.duration} days {challenge.createdBy}
        </Typography>
        <Typography className={classes.white}>
          {challenge.description}
        </Typography>
        <Typography className={classes.white}>Recommended schedule</Typography>
        <Typography className={classes.white}>{challenge.schedule}</Typography>

        {/* User has not enrolled in the challenge */}
        {/* TODO: ensure that user has < 3 challenges before allowing user to enroll */}
        {!userChallenge && (
          <>
            <Button
              variant="contained"
              fullWidth
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

        <SwipeableDrawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          onOpen={() => {
            setIsDrawerOpen(true);
          }}
          swipeAreaWidth={peekDrawerHeight}
          disableSwipeToOpen={false}
          keepMounted
          sx={{
            height: `calc(80% - ${peekDrawerHeight}px)`,
            overflow: 'scroll',
          }}
        >
          <Box className={classes.peekDrawer} sx={{ top: -peekDrawerHeight }}>
            <Box className={classes.puller} />
            <TabContext value={currentTabItem}>
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

              {Object.values(TabItem).map((tabItem) => (
                <TabPanel
                  key={tabItem}
                  value={tabItem}
                  className={classes.tabPanel}
                >
                  {tabPanelRenderer(tabItem)}
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </SwipeableDrawer>
      </Box>
    </Paper>
  );
};

export default ChallengeDetailsPage;
