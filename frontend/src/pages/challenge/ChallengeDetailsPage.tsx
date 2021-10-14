import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Typography,
  SwipeableDrawer,
  Tab,
  IconButton,
  Toolbar,
  Paper,
} from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { ChevronLeft, MoreVert } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { ChallengeData, UserChallengeData } from '../../types/challenges';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';

import ChallengeMilestones from './ChallengeMilestones';
import { loadAllTasks } from 'store/tasks/operations';
import { getTaskList } from 'store/tasks/selectors';

export interface ChallengeDetailsPageProps {
  challenge: ChallengeData;
  attempt: UserChallengeData;
}

const useStyles = makeStyles(() => ({
  paper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100vh',
  },
  appbar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  spacer: {
    flexGrow: 1,
  },
  drawer: {
    overflow: 'visible',
  },
  peekDrawer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    visibility: 'visible',
    overflow: 'auto',
    right: 0,
    left: 0,
  },
  puller: {
    width: 30,
    height: 6,
    backgroundColor: 'grey[300]',
    borderRadius: 3,
    position: 'absolute',
    left: 'calc(50% - 15px)',
  },
}));

enum TabItem {
  Milestones = 'Milestones',
  YourStats = 'Your Stats',
  Community = 'Community',
}

const ChallengeDetailsPage: React.FC = () => {
  const { challenge, attempt } = useLocation()
    .state as ChallengeDetailsPageProps;
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllTasks(Number(challengeId)));
  }, []);

  const { challengeId } = useParams<{ challengeId: string }>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tasks = useSelector((state: RootState) =>
    getTaskList(state, Number(challengeId))
  )!;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTabItem, setCurrentTabItem] = useState<TabItem>(
    TabItem.Milestones
  );

  const peekDrawerHeight = 200;

  const Bar = () => (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <IconButton
          edge="start"
          onClick={() => {
            history.goBack();
          }}
        >
          <ChevronLeft />
        </IconButton>
        <Box className={classes.spacer} />
        <IconButton>
          <MoreVert />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const Status = () =>
    attempt === null ? (
      <Typography>🔥 ONGOING</Typography>
    ) : (
      <Typography>👻 UNENROLLED</Typography>
    );

  const tabPanelRenderer = (tabItem: TabItem) => {
    switch (tabItem) {
      case TabItem.Milestones:
        return <ChallengeMilestones tasks={tasks} attempt={attempt} />;
      case TabItem.YourStats:
        return <div>stats</div>;
      case TabItem.Community:
        return <div>community</div>;
      default:
        throw new Error('Unknown tab item!');
    }
  };
  console.log(challenge);
  console.log(tasks);
  console.log(attempt);

  return (
    <Paper className={classes.paper} sx={{ backgroundColor: challenge.color }}>
      <Box>
        <Bar />
        <Status />
        <Typography component="h1">{challenge.name}</Typography>
        <Typography>{challenge.description}</Typography>
        <Typography>Recommended schedule</Typography>
        <Typography>{challenge.schedule}</Typography>
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
            overflow: 'visible',
          }}
        >
          <Box className={classes.peekDrawer} sx={{ top: -peekDrawerHeight }}>
            <Box className={classes.puller} />
            <TabContext value={currentTabItem}>
              <TabList
                onChange={(event: React.SyntheticEvent, newValue: TabItem) => {
                  setCurrentTabItem(newValue);
                }}
              >
                {Object.values(TabItem).map((tabItem) => (
                  <Tab key={tabItem} label={tabItem} value={tabItem} />
                ))}
              </TabList>

              {Object.values(TabItem).map((tabItem) => (
                <TabPanel key={tabItem} value={tabItem}>
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
