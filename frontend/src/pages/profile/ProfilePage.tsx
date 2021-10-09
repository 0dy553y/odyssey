import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'store/auth/selectors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import ActivityMap from './ActivityMap';
import { RootState } from 'store';
import {
  displayDate,
  displayUsername,
  displayDuration,
} from 'utils/formatting';
import { Duration } from 'date-fns';

interface ProfilePageProps {
  userProfileItems: { label: string; count: number }[];
  registrationDate: Date;
  challengesCompleted: number;
  longestStreakDuration: Duration;
}

// TODO: replace these
const mockProps: ProfilePageProps = {
  userProfileItems: [
    { label: 'friends', count: 20 },
    { label: 'completed challenges', count: 16 },
    { label: 'badges', count: 2 },
  ],
  registrationDate: new Date('2021-10-03'),
  challengesCompleted: 16,
  longestStreakDuration: { months: 1, days: 13 },
};

const ProfilePage: React.FC = () => {
  const {
    userProfileItems,
    registrationDate,
    challengesCompleted,
    longestStreakDuration: longestStreak,
  } = mockProps;

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector((state: RootState) => getUser(state))!; //

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AppBar
        position="static"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end" color="primary">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <IconButton>
        <Avatar
          src="https://breakbrunch.com/wp-content/uploads/2019/11/cute-bright-smile-112419.jpg"
          sx={{ width: '20vh', height: '20vh' }}
        />
      </IconButton>

      {user.displayName && (
        <Typography component="h1" variant="h4">
          {user.displayName}
        </Typography>
      )}

      <Typography component="h2" variant="h5" gutterBottom>
        {displayUsername(user.username)}
      </Typography>

      <Stack direction="row" spacing={4}>
        {userProfileItems.map((item) => (
          <Box
            key={item.label}
            display="flex"
            justifyContent="center"
            sx={{ width: 1 / userProfileItems.length }}
          >
            <Typography component="div" variant="body1">
              {item.count} <br />
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>
      <ActivityMap />

      <Grid container direction="column" alignItems="flex-start">
        <Grid item xs={12}>
          <Typography component="div" variant="h6">
            Stats
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography component="div" variant="body1">
            Challenger since {displayDate(registrationDate)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography component="div" variant="body1">
            Completed: {challengesCompleted}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography component="div" variant="body1">
            Longest streak: {displayDuration(longestStreak)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
