import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  white: {
    color: 'white',
  },
  bar: {
    background: 'transparent',
  },
}));

const Appbar = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.bar}>
      <Toolbar>
        <div
          onClick={() => {
            history.goBack();
          }}
        >
          <IconButton edge="start" className={classes.white}>
            <ChevronLeft />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
