import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Skeleton, Typography, Tab } from '@mui/material';
import { TaskListData } from 'types/tasks';
import { UserTaskListData } from 'types/usertasks';
import { ChallengeData } from 'types/challenges';
import ExpandedHeader from './ExpandedHeader';
import { getHexCode } from 'utils/color';
import UserChallengeStats from 'pages/challenge/UserChallengeStats';
import { UserChallengeData } from 'types/userchallenge';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import ChallengeMilestones from 'pages/challenge/ChallengeMilestones';
import { SpringRef, animated, SpringValue } from 'react-spring';
import { useScroll } from 'react-use-gesture';

const useStyles = makeStyles(() => ({
  contentContainer: {
    overflow: 'scroll',
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
    padding: '1em',
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
  userTasks: UserTaskListData[] | null;
  y: SpringValue<number>;
  setY: SpringRef<{ y: number }>;
}

const privateTabs = [TabItem.YourStats];

const ChallengeContent: React.FC<ChallengeContentProps> = (props) => {
  const { challenge, userChallenge, tasks, userTasks, y, setY } = props;
  const classes = useStyles();
  const bind = useScroll(({ xy }) => {
    console.log('hello');
    console.log(xy[1]);
    setY({ y: xy[1] });
  });

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
    <animated.div {...bind()} className={classes.contentContainer}>
      <ExpandedHeader challenge={challenge} userChallenge={userChallenge} />
      <div className={classes.contentDetails}>
        <TabContext value={currentTabItem}>
          <Box sx={{ padding: '0.5em 0 0 2em' }}>
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
    </animated.div>
  );
};

export default ChallengeContent;
