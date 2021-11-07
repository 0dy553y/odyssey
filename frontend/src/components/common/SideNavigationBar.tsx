import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
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

const SideNavigationBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const firstPathSegment = getFirstPathSegment(location.pathname);

  const items: {
    route: string;
    label: string;
    icon: React.ElementType;
  }[] = [
    { route: HOME_ROUTE, label: 'Home', icon: HomeIcon },
    {
      route: EXPLORE_ROUTE,
      label: 'Explore',
      icon: SearchIcon,
    },
    {
      route: FEED_ROUTE,
      label: 'Feed',
      icon: PeopleIcon,
    },
    {
      route: PROFILE_ROUTE,
      label: 'Profile',
      icon: AccountCircleIcon,
    },
  ];

  return (
    <Drawer
      sx={{
        width: '20vw',
        height: '100%',
        '& .MuiDrawer-paper': {
          width: '20vw',
          paddingTop: '3em',
          height: '100%',
          boxSizing: 'border-box',
          backgroundColor: '#f5f7f9',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {items.map((item) => {
          const isSelected = firstPathSegment === item.route;

          return (
            <ListItem
              button
              key={item.route}
              onClick={() => history.push(item.route)}
              style={{
                borderRadius: '1em',
                marginLeft: '0.5em',
                width: '95%',
              }}
            >
              <ListItemIcon>
                {React.createElement(item.icon, {
                  color: isSelected ? 'primary' : 'secondary',
                })}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ color: isSelected ? 'primary.main' : 'secondary' }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideNavigationBar;
