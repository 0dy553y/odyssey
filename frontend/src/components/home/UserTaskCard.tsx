import React from 'react';
import { Link } from 'react-router-dom';
import { UserTaskListData } from '../../types/usertasks';
import { Card, IconButton, Switch, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import { makeStyles } from '@mui/styles';
import {
  markUserTaskAsDoneFromHome,
  markUserTaskAsNotDone,
} from '../../store/usertasks/operations';
import { useDispatch } from 'react-redux';
import { getHexCode, getComplementaryColor } from 'utils/color';
import { isAfter } from 'date-fns';
import { CHALLENGE_ROUTE, MAP_ROUTE } from '../../routing/routes';

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
  scrollableText: {
    flexGrow: 1,
    height: '75px',
    // Padding for scrollbar
    paddingRight: '8px',
    overflowY: 'scroll',
  },
  padding: {
    height: 15,
  },
  toggle: {
    width: 50,
    height: 34,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 3,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: (userTask: UserTaskListData) =>
            getComplementaryColor(userTask.challengeColor),
          opacity: 1,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 28,
      height: 28,
    },
    '& .MuiSwitch-track': {
      borderRadius: 34 / 2,
      opacity: 0.3,
    },
  },
  controlsContainer: {
    display: 'flex',
  },
  toggleContainer: {
    flexGrow: 1,
  },
}));

interface Props {
  userTask: UserTaskListData;
  onChallengeCompleted: (completedChallengeId: number) => void;
  onTaskCompleted: (openChallengeName: string) => void;
}

const UserTaskCard: React.FC<Props> = ({
  userTask,
  onChallengeCompleted,
  onTaskCompleted,
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
      dispatch(
        markUserTaskAsDoneFromHome(
          userTask.id,
          onChallengeCompleted,
          onTaskCompleted
        )
      );
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
        <Typography
          align="left"
          className={`${classes.secondaryText} ${classes.scrollableText}`}
        >
          {userTask.description}
        </Typography>
        <div className={classes.controlsContainer}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <IconButton
              component={Link}
              to={`${MAP_ROUTE}/${userTask.challengeId}`}
            >
              <MapIcon filter="invert(1)" />
            </IconButton>
            <IconButton
              component={Link}
              to={`${CHALLENGE_ROUTE}/${userTask.challengeId}`}
            >
              <InfoIcon filter="invert(1)" />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={2}
            className={classes.toggleContainer}
          >
            {!isAfter(userTask.scheduledFor, new Date()) && (
              <Switch
                checked={!!userTask.completedAt}
                onChange={handleDoneToggle}
                className={classes.toggle}
              />
            )}
          </Stack>
        </div>
      </div>
    </Card>
  );
};

export default UserTaskCard;
