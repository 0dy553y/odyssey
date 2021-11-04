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

  const items: {
    value: string;
    route: string;
    label: string;
    icon: React.ElementType;
  }[] = [
    { value: 'home', route: HOME_ROUTE, label: 'Home', icon: HomeOutlinedIcon },
    {
      value: 'explore',
      route: EXPLORE_ROUTE,
      label: 'Explore',
      icon: SearchOutlinedIcon,
    },
    {
      value: 'feed',
      route: FEED_ROUTE,
      label: 'Feed',
      icon: PeopleOutlineIcon,
    },
    {
      value: 'profile',
      route: PROFILE_ROUTE,
      label: 'Profile',
      icon: AccountCircleOutlinedIcon,
    },
  ];

  return (
    <Paper elevation={0}>
      <Drawer
        sx={{
          width: '25vw',
          height: '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '25vw',
            height: '100%',
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {items.map((item) => {
            return (
              <ListItem
                button
                key={item.value}
                onClick={() => history.push(item.route)}
              >
                <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Paper>
  );
};

export default SideNavigationBar;
