import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import { Card, Switch, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  markUserTaskAsDoneFromHome,
  markUserTaskAsNotDone,
} from '../../store/usertasks/operations';
import { useDispatch } from 'react-redux';
import { getHexCode } from 'utils/color';
import { isAfter } from 'date-fns';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: (userTask: UserTaskListData) =>
      getHexCode(userTask.challengeColor),
    borderRadius: 25,
    height: '100%',
  },
  cardContents: {
    padding: 25,
    height: 'calc(100% - 50px)',
    display: 'flex',
    flexDirection: 'column',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
    opacity: 80,
  },
  padding: {
    height: 15,
  },
  doneToggle: {
    flexGrow: 1,
  },
}));

interface Props {
  userTask: UserTaskListData;
  onChallengeCompleted: (completedChallengeName: string) => void;
}

const UserTaskCard: React.FC<Props> = ({
  userTask,
  onChallengeCompleted,
}: Props) => {
  const classes = useStyles(userTask);
  const dispatch = useDispatch();

  const status = !!userTask.completedAt
    ? '🎉 Completed!'
    : isAfter(userTask.scheduledFor, new Date())
    ? '💪 Upcoming'
    : '🔥 Ongoing';

  const handleDoneToggle = () => {
    if (!userTask.completedAt) {
      dispatch(markUserTaskAsDoneFromHome(userTask.id, onChallengeCompleted));
    } else {
      dispatch(markUserTaskAsNotDone(userTask.id));
    }
  };

  return (
    <Card className={classes.card}>
      <div className={classes.cardContents}>
        <Typography align="left" className={classes.primaryText}>
          {status}
        </Typography>
        <Typography align="left" variant="h5" className={classes.primaryText}>
          {userTask.name}
        </Typography>
        <Typography align="left" variant="h6" className={classes.secondaryText}>
          {userTask.challengeName}
        </Typography>
        <div className={classes.padding} />
        <Typography align="left" className={classes.secondaryText}>
          {userTask.description}
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          className={classes.doneToggle}
        >
          {!isAfter(userTask.scheduledFor, new Date()) && (
            <Switch
              checked={!!userTask.completedAt}
              onChange={handleDoneToggle}
            />
          )}
        </Stack>
      </div>
    </Card>
  );
};

export default UserTaskCard;
