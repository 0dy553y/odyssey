import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircleRounded';
import {
  EXPLORE_ROUTE,
  FEED_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
} from '../../routing/routes';
import { getFirstPathSegment } from '../../utils/url';

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <Paper elevation={0}>
      <BottomNavigation
        showLabels
        value={getFirstPathSegment(location.pathname)}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          value={HOME_ROUTE}
          component={Link}
          to={HOME_ROUTE}
        />
        <BottomNavigationAction
          label="Explore"
          icon={<SearchIcon />}
          value={EXPLORE_ROUTE}
          component={Link}
          to={EXPLORE_ROUTE}
        />
        <BottomNavigationAction
          label="Feed"
          icon={<PeopleIcon />}
          value={FEED_ROUTE}
          component={Link}
          to={FEED_ROUTE}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          value={PROFILE_ROUTE}
          component={Link}
          to={PROFILE_ROUTE}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
