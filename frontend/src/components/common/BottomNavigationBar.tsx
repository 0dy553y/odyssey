import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Toolbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {
  EXPLORE_ROUTE,
  FEED_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
} from '../../routing/routes';
import { getFirstPathSegment } from '../../utils/url';

const useStyles = makeStyles(() => ({
  paper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const BottomNavigationBar: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      {/*
      This extra toolbar is so that the navigation bar does not hide content
      See: https://mui.com/components/app-bar/#fixed-placement
      */}
      <Toolbar />
      <Paper className={classes.paper} elevation={0}>
        <BottomNavigation
          showLabels
          value={getFirstPathSegment(location.pathname)}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeOutlinedIcon />}
            value={HOME_ROUTE}
            component={Link}
            to={HOME_ROUTE}
          />
          <BottomNavigationAction
            label="Explore"
            icon={<SearchOutlinedIcon />}
            value={EXPLORE_ROUTE}
            component={Link}
            to={EXPLORE_ROUTE}
          />
          <BottomNavigationAction
            label="Feed"
            icon={<PeopleOutlineIcon />}
            value={FEED_ROUTE}
            component={Link}
            to={FEED_ROUTE}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<AccountCircleOutlinedIcon />}
            value={PROFILE_ROUTE}
            component={Link}
            to={PROFILE_ROUTE}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default BottomNavigationBar;
