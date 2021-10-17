import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import { Card, Switch, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  markUserTaskAsDone,
  markUserTaskAsNotDone,
} from '../../store/usertasks/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#9F88E3',
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
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
}));

interface Props {
  userTask: UserTaskListData;
}

const UserTaskCard: React.FC<Props> = ({ userTask }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const status = !!userTask.completedAt ? '🎉 Completed!' : '🔥 Ongoing';

  const handleDoneToggle = () => {
    if (!userTask.completedAt) {
      dispatch(markUserTaskAsDone(userTask.id));
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
        <div className={classes.doneToggle}>
          <Switch
            checked={!!userTask.completedAt}
            onChange={handleDoneToggle}
          />
        </div>
      </div>
    </Card>
  );
};

export default UserTaskCard;
