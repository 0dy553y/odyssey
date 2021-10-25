import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  textContainer: {
    width: '100%',
    flexGrow: 1,
    display: 'grid',
    placeItems: 'center',
  },
  text: {
    color: 'gray',
    marginLeft: 50,
    marginRight: 50,
  },
}));

const NotificationsList: React.FC = () => {
  const classes = useStyles();

  // TODO: Implement this.
  const notifications = [];

  if (notifications.length == 0) {
    return (
      <div className={classes.textContainer}>
        <Typography align="center" className={classes.text}>
          You have no pending notifications!
        </Typography>
      </div>
    );
  }

  return <></>;
};

export default NotificationsList;
