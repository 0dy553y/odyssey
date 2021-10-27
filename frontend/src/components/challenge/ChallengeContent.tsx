import React, { useReducer, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Skeleton, Typography, Tab } from '@mui/material';
import { TaskListData } from 'types/tasks';
import { UserTaskListData } from 'types/usertasks';
import { ChallengeData, Schedule } from 'types/challenges';
import ExpandedHeader from './ExpandedHeader';
import { getHexCode } from 'utils/color';
import UserChallengeStats from 'pages/challenge/UserChallengeStats';
import { UserChallengeData } from 'types/userchallenge';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import ChallengeMilestones from 'pages/challenge/ChallengeMilestones';
import { useScroll } from 'react-use-gesture';
import ChallengeCompletedModal from 'components/challengeCompletedModal';
import { motion } from 'framer-motion';
import InView, { useInView } from 'react-intersection-observer';
import CollapsedHeader from './CollapsedHeader';
import ScheduleModal from 'pages/challenge/ScheduleModal';
import { joinChallenge } from 'store/challenges/operations';

const useStyles = makeStyles(() => ({
  contentContainer: {
    // overflow: 'scroll',
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
    position: 'sticky',
    padding: '1em',
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
    padding: '60px 2.5em 100px 2.5em',
  },
  tabs: {
    padding: '0.5em 0 0 2em',
    backgroundColor: '#f5f7f9',
    position: 'sticky',
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
    opacity: 1,
    transition: 'opacity 0.5s',
  },
  fadeOut: {
    opacity: 0,
    transition: 'opacity 0.5s',
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

  const isEnrolled = !!userChallenge;

  const [ref, inView, entry] = useInView({
    threshold: 0.2,
  });

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
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={!inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <CollapsedHeader name={challenge.name} color={challenge.color} />
      </motion.div> */}
      {/* <CollapsedHeader name={String(inView)} color={challenge.color} /> */}
      {/* {!inView && (
        <div className={inView ? classes.fadeOut : classes.fadeIn}>
          <CollapsedHeader name={challenge.name} color={challenge.color} />
        </div>
      )} */}
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
                {!!userChallenge ? '🔥 ONGOING' : '👻 UNENROLLED'}
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
                Hello oirefjeijfoeijfoei rforf Hello oirefjeijfoeijfoei rforf
                Hello oirefjeijfoeijfoei rforf Hello oirefjeijfoeijfoei
                rforfHello oirefjeijfoeijfoei rforfHello oirefjeijfoeijfoei
                rforfHello oirefjeijfoeijfoei rforfHello oirefjeijfoeijfoei
                rforfHello oirefjeijfoeijfoei rforfHello oirefjeijfoeijfoei
                rforfHello oirefjeijfoeijfoei rforfHello oirefjeijfoeijfoei
                rforfHello oirefjeijfoeijfoei rforf
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
    </Box>
  );
};

export default ChallengeContent;

// const Searchbar: React.FC<SearchbarProps> = (props) => {
//   const { placeholder, onChange } = props;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(e.target.value);
//   };

//   return (
//     <Search>
//       <SearchIconWrapper>
//         <SearchIcon />
//       </SearchIconWrapper>
//       <StyledInputBase
//         placeholder={placeholder}
//         inputProps={{ 'aria-label': 'search' }}
//         onChange={handleChange}
//       />
//     </Search>
//   );
// };

// export default Searchbar;
