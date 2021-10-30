import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';

const Appbar: React.FC = () => {
  const history = useHistory();
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
