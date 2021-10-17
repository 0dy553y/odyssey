import React from 'react';
import { UserTaskListData } from '../../types/usertasks';
import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getHexCode } from 'utils/color';

const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: (userTask: UserTaskListData) =>
      getHexCode(userTask.challengeColor),
    borderRadius: 25,
    height: '100%',
  },
  cardContents: {
    padding: 25,
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
    opacity: 80,
  },
}));

interface Props {
  userTask: UserTaskListData;
}

const UserTaskCard: React.FC<Props> = ({ userTask }: Props) => {
  const classes = useStyles(userTask);

  const status = !!userTask.completedAt ? '🎉 Completed!' : '🔥 Ongoing';

  return (
    <Card className={classes.card}>
      <div className={classes.cardContents}>
        <Typography align="left" className={classes.primaryText}>
          {status}
        </Typography>
        <Typography align="left" variant="h5" className={classes.primaryText}>
          {userTask.name}
        </Typography>
        <Typography align="left" className={classes.secondaryText}>
          {userTask.challengeName}
        </Typography>
        <Typography align="left" className={classes.secondaryText}>
          {userTask.description}
        </Typography>
      </div>
    </Card>
  );
};

export default UserTaskCard;
