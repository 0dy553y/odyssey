import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import { TaskListData } from 'types/tasks';
import { UserTaskListData } from 'types/usertasks';
import { ChallengeData } from 'types/challenges';
import ExpandedHeader from './ExpandedHeader';
import { getHexCode } from 'utils/color';

const useStyles = makeStyles(() => ({
  contentContainer: {
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));

interface ChallengeContentProps {
  challenge: ChallengeData;
  tasks: TaskListData[];
  userTasks: UserTaskListData[] | null;
}

const ChallengeContent: React.FC<ChallengeContentProps> = (props) => {
  const { challenge, tasks, userTasks } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.contentContainer}
      style={{ backgroundColor: 'getHexCode(challenge.color)' }}
    >
      <ExpandedHeader name={challenge.name} />
    </div>
  );
};

export default ChallengeContent;
