import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
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

const SideNavigationBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const firstPathSegment = getFirstPathSegment(location.pathname);

  const items: {
    route: string;
    label: string;
    icon: React.ElementType;
  }[] = [
    { route: HOME_ROUTE, label: 'Home', icon: HomeOutlinedIcon },
    {
      route: EXPLORE_ROUTE,
      label: 'Explore',
      icon: SearchOutlinedIcon,
    },
    {
      route: FEED_ROUTE,
      label: 'Feed',
      icon: PeopleOutlineIcon,
    },
    {
      route: PROFILE_ROUTE,
      label: 'Profile',
      icon: AccountCircleOutlinedIcon,
    },
  ];

  return (
    <Drawer
      sx={{
        width: '20vw',
        height: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '20vw',
          paddingTop: '3em',
          height: '100%',
          boxSizing: 'border-box',
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
            >
              <ListItemIcon>
                {React.createElement(item.icon, {
                  color: isSelected ? 'primary' : undefined,
                })}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ color: isSelected ? 'primary.main' : undefined }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideNavigationBar;
