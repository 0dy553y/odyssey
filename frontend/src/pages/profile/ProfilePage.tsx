import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'store/auth/selectors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import ProfileHeader from './ProfileHeader';
import ActivityMap, { ActivityMapDataPoint } from './ActivityMap';
import UserStats from './UserStats';
import ChallengeSummaries, {
  ChallengeSummaryProps,
} from './ChallengeSummaries';
import { useHistory } from 'react-router-dom';
import { Duration } from 'date-fns';
import { EDIT_PROFILE_ROUTE } from 'routing/routes';
import { logout } from 'store/auth/operations';

interface ProfilePageProps {
  userProfileItems: { label: string; count: number }[];
  registrationDate: Date;
  challengesCompleted: number;
  longestStreakDuration: Duration;
  challengeSummaries: ChallengeSummaryProps[];
  activityMapData: ActivityMapDataPoint[];
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
  activityMapData: [
    { date: new Date('2021-10-02'), count: 6 },
    { date: new Date('2021-09-22'), count: 3 },
    { date: new Date('2021-09-30'), count: 2 },
    { date: new Date('2021-10-03'), count: 2 },
    { date: new Date('2021-10-01'), count: 1 },
    { date: new Date('2021-09-15'), count: 9 },
    { date: new Date('2021-09-14'), count: 2 },
    { date: new Date('2021-09-07'), count: 1 },
  ],
};

const useStyles = makeStyles<Theme, ProfilePageProps>((theme) =>
  createStyles({
    profilePageContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
    profileHeaderContainer: {
      justifyContent: 'center',
      textAlign: 'center',
      background: 'black',
      paddingBottom: theme.spacing(3),
      position: 'relative',
      borderRadius: '0 0 2em 2em',
      margin: '0 -50vw 1em -50vw',
      maxWidth: '100vw',
      left: '50%',
      right: '50%',
      width: '100vw',
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
    activityMapData,
  } = mockProps;

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles(mockProps);

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box className={classes.profilePageContainer}>
      <Grid container className={classes.profileHeaderContainer}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton edge="end" color="primary" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  history.push(EDIT_PROFILE_ROUTE);
                }}
              >
                Edit Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  dispatch(logout(history));
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <ProfileHeader user={user} userProfileItems={userProfileItems} />
      </Grid>

      <ActivityMap activityMapData={activityMapData} />

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
