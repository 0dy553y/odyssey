import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'store/auth/selectors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import ProfileHeader from './ProfileHeader';
import ActivityMap from './ActivityMap';
import UserStats from './UserStats';
import ChallengeSummaries, {
  ChallengeSummaryProps,
} from './ChallengeSummaries';
import { RootState } from 'store';
import { Duration } from 'date-fns';

interface ProfilePageProps {
  userProfileItems: { label: string; count: number }[];
  registrationDate: Date;
  challengesCompleted: number;
  longestStreakDuration: Duration;
  challengeSummaries: ChallengeSummaryProps[];
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
  longestStreakDuration: { months: 1, days: 50 },
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

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      background: 'transparent',
      boxShadow: 'none',
    },
  })
);

const ProfilePage: React.FC = () => {
  const {
    userProfileItems,
    registrationDate,
    challengesCompleted,
    longestStreakDuration,
    challengeSummaries,
  } = mockProps;

  const classes = useStyles();

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector((state: RootState) => getUser(state))!; //

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end" color="primary">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ProfileHeader user={user} userProfileItems={userProfileItems} />

      <ActivityMap />

      <UserStats
        challengesCompleted={challengesCompleted}
        registrationDate={registrationDate}
        longestStreakDuration={longestStreakDuration}
      />

      <ChallengeSummaries challengeSummaries={challengeSummaries} />
    </Box>
  );
};

export default ProfilePage;
