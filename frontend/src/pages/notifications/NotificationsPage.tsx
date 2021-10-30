import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { useHistory } from 'react-router-dom';
import NotificationsList from '../../components/notifications/NotificationsList';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  rootContainer: {
    height: '100%',
    padding: '2em 1.5em 0 1.5em',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    fontFamily: 'Frock',
  },
}));

const NotificationsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.rootContainer}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginLeft: '-1.5em' }}
            edge="start"
            onClick={() => history.goBack()}
          >
            <BackArrow filter="invert(1)" height="1.5em" width="1.5em" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h4" className={classes.header}>
        Notifications
      </Typography>

      <NotificationsList />
    </Box>
  );
};

export default NotificationsPage;
