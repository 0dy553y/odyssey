import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
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

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Paper elevation={0}>
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
