import React, { useReducer, useState } from 'react';
import {
  AppBar,
  Box,
  Typography,
  SwipeableDrawer,
  Tabs,
  Tab,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ChevronLeft, MoreVert } from '@mui/icons-material';
import { ChallengeData } from '../../types/challenges';
import { useHistory } from 'react-router-dom';

interface ChallengeDetailsPageState {
  challenge: ChallengeData;
}

const ChallengeDetailsPage: React.FC = () => {
  const [state, setState] = useReducer(
    (s: ChallengeDetailsPageState, a: Partial<ChallengeDetailsPageState>) => ({
      ...s,
      ...a,
    }),
    {
      // TODO: replace.
      challenge: {
        id: '1',
        name: 'Couch to 5k',
        description:
          'Couch to 5K is a running plan for absolute beginners. It was developed by a new runner, Josh Clark, who wanted to help his 50-something mum get off the couch and start running, too.',
        schedule: '3 times a week, alternate days',
        duration: 10,
        tasks: [],
      },
    }
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const peekDrawerHeight = 56;

  const Puller = () => (
    <Box
      sx={{
        width: 30,
        height: 6,
        backgroundColor: 'grey[300]',
        borderRadius: 3,
        position: 'absolute',
        left: 'calc(50% - 15px)',
      }}
    ></Box>
  );

  const Details = () => (
    <Box>
      <Typography>{state.challenge.description}</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'aqua',
        height: '100vh',
      }}
    >
      <AppBar position="static">
        <IconButton edge="start">
          <ChevronLeft />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </AppBar>
      <Typography component="h1">{state.challenge.name}</Typography>
      <Typography>{state.challenge.description}</Typography>
      <Typography>Recommended schedule</Typography>
      <Typography>{state.challenge.schedule}</Typography>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        onOpen={() => {
          setIsDrawerOpen(true);
        }}
        swipeAreaWidth={peekDrawerHeight}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            top: -peekDrawerHeight,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Tabs>
            <Tab label={'Milestones'} />
          </Tabs>
          <Details />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default ChallengeDetailsPage;
