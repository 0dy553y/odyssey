import React, { useEffect } from 'react';
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
import { makeStyles } from '@mui/styles';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ActivityMap from '../../components/profile/ActivityMap';
import UserStats from '../../components/profile/UserStats';
import ChallengeSummaries from '../../components/profile/ChallengeSummaries';
import { useHistory } from 'react-router-dom';
import {
  BADGE_ROUTE,
  COMPLETED_CHALLENGES_ROUTE,
  EDIT_PROFILE_ROUTE,
  FRIENDS_ROUTE,
} from 'routing/routes';
import { logout } from 'store/auth/operations';
import useScrollbarSize from 'react-scrollbar-size';
import {
  loadAllCompletedUserChallenges,
  loadAllOngoingUserChallenges,
} from 'store/userchallenges/operations';
import {
  getAllCompletedUserChallenges,
  getAllOngoingUserChallenges,
} from 'store/userchallenges/selectors';
import { getUserTaskActivityData } from 'store/usertasks/selectors';
import { RootState } from 'store';
import { UserTaskActivityDatum } from 'types/usertasks';
import { loadUserTaskActivityData } from 'store/usertasks/operations';

export interface StyleProps {
  scrollbarWidth: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  profilePageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  profileHeaderContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    background: '#1C1C1C',
    paddingBottom: theme.spacing(3),
    position: 'relative',
    borderRadius: '0 0 2em 2em',
    margin: (props) =>
      `0 calc(-50vw + ${props.scrollbarWidth / 2}px) 1em calc(-50vw + ${
        props.scrollbarWidth / 2
      }px)`,
    left: '50%',
    right: '50%',
    width: (props) => `calc(100vw - ${props.scrollbarWidth}px)`,
  },
}));

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { width } = useScrollbarSize();
  const classes = useStyles({ scrollbarWidth: width });

  useEffect(() => {
    dispatch(loadAllOngoingUserChallenges());
    dispatch(loadAllCompletedUserChallenges());
  }, []);

  // user should never be undefined (assuming auth routing works)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ongoingChallenges = useSelector((state: RootState) =>
    getAllOngoingUserChallenges(state)
  )!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const completedChallenges = useSelector((state: RootState) =>
    getAllCompletedUserChallenges(state)
  )!;

  const userTaskActivityData: UserTaskActivityDatum[] = useSelector(
    getUserTaskActivityData
  );

  // TODO: replace these
  const userProfileItems: {
    label: string;
    count: number;
    onClick: () => void;
  }[] = [
    {
      label: 'friends',
      count: 0,
      onClick: () => history.push(FRIENDS_ROUTE),
    },
    {
      label:
        completedChallenges.length === 1
          ? 'completed challenge'
          : 'completed challenges',
      count: completedChallenges.length,
      onClick: () => history.push(COMPLETED_CHALLENGES_ROUTE),
    },
    { label: 'badges', count: 0, onClick: () => history.push(BADGE_ROUTE) },
  ];

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

  useEffect(() => {
    dispatch(loadUserTaskActivityData());
  }, []);

  return (
    <>
      <Box
        className={classes.profilePageContainer}
        sx={{ padding: '0 1.5em 0 1.5em' }}
      >
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

        <ActivityMap activityMapData={userTaskActivityData} />

        <UserStats
          challengesCompleted={completedChallenges.length}
          registrationDate={user.registrationDate}
        />

        <ChallengeSummaries challenges={ongoingChallenges} />
      </Box>
    </>
  );
};

export default ProfilePage;
