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

const Appbar: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <AppBar
      position="absolute"
      style={{ background: 'transparent', boxShadow: 'none' }}
    >
      <Toolbar>
        <div
          onClick={() => {
            history.goBack();
          }}
        >
          <IconButton edge="start" style={{ color: 'white' }}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
