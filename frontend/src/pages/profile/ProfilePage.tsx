import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { getUser } from 'store/auth/selectors';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Box,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ActivityMap from '../../components/profile/ActivityMap';
import UserStats from '../../components/profile/UserStats';
import ChallengeSummaries from '../../components/profile/ChallengeSummaries';
import { useHistory, useParams } from 'react-router-dom';
import {
  BADGE_ROUTE,
  COMPLETED_CHALLENGES_ROUTE,
  EDIT_PROFILE_ROUTE,
  FRIENDS_ROUTE,
  POSTS_ROUTE,
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
import { loadAllFriends } from '../../store/friends/operations';
import { FriendListData } from '../../types/friends';
import { getFriendList } from '../../store/friends/selectors';
import { loadUser } from '../../store/users/operations';
import { getUserByUsername } from '../../store/users/selectors';
import { loadPostsForUser } from 'store/posts/operations';
import { PostListData } from 'types/posts';
import { getUserPostList } from 'store/posts/selectors';

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
  const { username } = useParams<{ username: string | undefined }>();

  const isOwnProfilePage = username === undefined;

  useEffect(() => {
    batch(() => {
      dispatch(loadUser(username));
      dispatch(loadAllOngoingUserChallenges(username));
      dispatch(loadAllCompletedUserChallenges(username));
      dispatch(loadAllFriends(username));
      dispatch(loadUserTaskActivityData(username));
      dispatch(loadPostsForUser(username));
    });
  }, []);

  // user should never be undefined (assuming auth routing works)
  const user = isOwnProfilePage
    ? useSelector(getUser)
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      useSelector((state: RootState) => getUserByUsername(state, username!));
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

  const friends: FriendListData[] = useSelector(getFriendList);

  const userPosts: PostListData[] = useSelector(getUserPostList);

  const userProfileItems: {
    label: string;
    count: number;
    onClick: () => void;
  }[] = [
    {
      label: `friend${friends.length === 1 ? '' : 's'}`,
      count: friends.length,
      onClick: () => {
        if (isOwnProfilePage) {
          history.push(FRIENDS_ROUTE);
        } else {
          history.push(`${FRIENDS_ROUTE}/${username}`);
        }
      },
    },
    {
      label:
        completedChallenges.length === 1
          ? 'completed challenge'
          : 'completed challenges',
      count: completedChallenges.length,
      onClick: () => {
        if (isOwnProfilePage) {
          history.push(COMPLETED_CHALLENGES_ROUTE);
        } else {
          history.push(`${COMPLETED_CHALLENGES_ROUTE}/${username}`);
        }
      },
    },
    {
      label: completedChallenges.length === 1 ? 'memento' : 'mementos',
      count: completedChallenges.length,
      onClick: () => {
        if (isOwnProfilePage) {
          history.push(BADGE_ROUTE);
        } else {
          history.push(`${BADGE_ROUTE}/${username}`);
        }
      },
    },
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

  return (
    <>
      <Box
        className={classes.profilePageContainer}
        sx={{ padding: '0 1.5em 0 1.5em' }}
      >
        <Grid container className={classes.profileHeaderContainer}>
          <AppBar position="static">
            <Toolbar>
              {!isOwnProfilePage && (
                <div
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <IconButton edge="start" sx={{ padding: '1em' }}>
                    <BackArrow height="1.5em" width="1.5em" />
                  </IconButton>
                </div>
              )}
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

        <Stack
          direction="row"
          justifyContent="space-between"
          onClick={() => {
            if (isOwnProfilePage) {
              history.push(POSTS_ROUTE);
            } else {
              history.push(`${POSTS_ROUTE}/${username}`);
            }
          }}
        >
          <Typography>View posts ({userPosts.length})</Typography>

          <ChevronRightIcon />
        </Stack>
        <Divider />

        <ActivityMap activityMapData={userTaskActivityData} />

        <UserStats
          challengesCompleted={completedChallenges.length}
          registrationDate={user?.registrationDate}
        />

        <ChallengeSummaries
          challenges={ongoingChallenges}
          isCurrentUser={isOwnProfilePage}
        />
      </Box>
    </>
  );
};

export default ProfilePage;
