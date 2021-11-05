import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Theme, Tab } from '@mui/material';
import { TaskListData } from 'types/tasks';
import { useDispatch } from 'react-redux';
import { ChallengeData } from 'types/challenges';
import { getHexCode } from 'utils/color';
import UserChallengeStats from 'components/challenge/UserChallengeStats';
import { UserChallengeData } from 'types/userchallenge';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import ChallengeMilestones from 'components/challenge/ChallengeMilestones';
import { MemoizedFeedPostList } from 'components/feed/FeedPostList';
import { UserData } from 'types/auth';
import LoadingPage from 'pages/loading/LoadingPage';
import {
  addReactionToPost,
  removeReactionFromPost,
} from 'store/posts/operations';
import { PostListData, ReactionEmoji } from 'types/posts';

const useStyles = makeStyles((theme: Theme) => ({
  contentDetails: {
    padding: '1em 0.5em',
    borderRadius: '2em 2em 0 0',
    backgroundColor: '#f5f7f9',
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
  tab: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '1em',
    color: 'rgba(0, 0, 0, 0.5)',
    '&.Mui-selected': {
      color: '#000',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
    },
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
  isEnrolled: boolean;
  isChallengeCompleted: boolean;
  onTaskCompleted: () => void;
  onChallengeCompleted: (completedChallengeId: number) => void;
}

const privateTabs = [TabItem.YourStats];

const ChallengeContent: React.FC<ChallengeContentProps> = (props) => {
  const {
    challenge,
    userChallenge,
    tasks,
    posts,
    currentUser,
    isEnrolled,
    onTaskCompleted,
    onChallengeCompleted,
  } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

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

  return (
    <Box className={classes.contentDetails}>
      <TabContext value={currentTabItem}>
        <Box className={classes.tabs}>
          <TabList
            TabIndicatorProps={{
              children: (
                <Box
                  component="span"
                  sx={{
                    backgroundColor: getHexCode(challenge.color),
                    width: '100%',
                    maxWidth: 50,
                  }}
                />
              ),
              style: {
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                height: '5px',
              },
            }}
            centered
            variant="fullWidth"
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
              return (
                <Tab
                  className={classes.tab}
                  key={tabItem}
                  label={tabItem}
                  value={tabItem}
                />
              );
            })}
          </TabList>
        </Box>
        {Object.values(TabItem).map((tabItem) => (
          <TabPanel key={tabItem} value={tabItem}>
            {tabPanelRenderer(tabItem)}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default ChallengeContent;
