import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'store/auth/selectors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import ActivityMap from './ActivityMap';
import CircularProgressWithLabel from 'components/CircularProgressWithLabel';
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
  challengeSummaries: ChallengeSummaryProps[];
}

interface ChallengeSummaryProps {
  id: number;
  percentage: number;
  label: string;
  remarks: string;
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
  challengeSummaries: [
    {
      id: 1,
      percentage: 75,
      label: 'Couch to 5k',
      remarks: '🔥 4 day streak!',
    },
    {
      id: 2,
      percentage: 20,
      label: 'Mermay',
      remarks: 'Waddle right back in',
    },
    {
      id: 3,
      percentage: 50,
      label: 'Marmay',
      remarks: 'Waddle right back in',
    },
    {
      id: 4,
      percentage: 25,
      label: 'Mermey',
      remarks: 'Waddle right back in',
    },
  ],
};

const ProfilePage: React.FC = () => {
  const {
    userProfileItems,
    registrationDate,
    challengesCompleted,
    longestStreakDuration,
    challengeSummaries,
  } = mockProps;

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector((state: RootState) => getUser(state))!; //

  const ChallengeSummary = ({
    percentage,
    label,
    remarks,
  }: ChallengeSummaryProps) => (
    <Grid
      container
      sx={{
        background: 'papayawhip',
        borderRadius: '1em',
        padding: '1em',
        mb: '1em',
      }}
    >
      <Stack direction="row" spacing={4} alignItems="center">
        <CircularProgressWithLabel variant="determinate" value={percentage} />
        <Stack direction="column" alignItems="flex-start">
          <Typography component="div" variant="body1">
            {label}
          </Typography>
          <Typography component="div" variant="body1">
            {remarks}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );

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

      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
      >
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
            Longest streak: {displayDuration(longestStreakDuration)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography component="div" variant="h6">
            Challenges
          </Typography>
        </Grid>

        {challengeSummaries.map((summary) => (
          <ChallengeSummary key={summary.id} {...summary} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProfilePage;
