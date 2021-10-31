import React, { useState, useEffect } from 'react';
import { loadChallenge } from 'store/challenges/operations';
import { batch, useDispatch, useSelector } from 'react-redux';
import { loadAllTasks } from 'store/tasks/operations';
import { loadAllUserChallengesDataForChallenge } from 'store/userchallenges/operations';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'store';
import { getChallenge } from 'store/challenges/selectors';
import { getTaskList } from 'store/tasks/selectors';
import { getLatestUserChallengeDataForChallenge } from 'store/userchallenges/selectors';
import { Box, IconButton, Menu, MenuItem, Skeleton } from '@mui/material';
import ChallengeContent from 'components/challenge/ChallengeContent';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { getUser } from 'store/auth/selectors';
import { loadPostsForChallenge } from 'store/posts/operations';
import { getChallengePostList } from 'store/posts/selectors';

const useStyles = makeStyles(() => ({
  joinButton: {
    marginTop: '28px',
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    left: '50%',
    transform: 'translateX(-50%) translateY(280px)',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    textTransform: 'none',
  },
  white: {
    color: 'white',
  },
  spacer: {
    flexGrow: 1,
  },
  backIcon: {
    position: 'fixed',
    zIndex: 5,
    color: 'white',
    top: '0.45em',
    left: '1.5em',
  },
  menuIcon: {
    position: 'fixed',
    zIndex: 5,
    color: 'white',
    top: '0.45em',
    right: '1.5em',
  },
}));

const ChallengeDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    batch(() => {
      dispatch(loadChallenge(Number(challengeId)));
      dispatch(loadAllTasks(Number(challengeId)));
      dispatch(loadAllUserChallengesDataForChallenge(Number(challengeId)));
      dispatch(loadPostsForChallenge(Number(challengeId)));
    });
  }, []);

  const { challengeId } = useParams<{ challengeId: string }>();

  const challenge = useSelector((state: RootState) =>
    getChallenge(state, Number(challengeId))
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tasks = useSelector((state: RootState) =>
    getTaskList(state, Number(challengeId))
  )!;

  const userChallenge = useSelector((state: RootState) =>
    getLatestUserChallengeDataForChallenge(state, Number(challengeId))
  );

  const posts = useSelector((state: RootState) =>
    getChallengePostList(state, Number(challengeId))
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!;

  const canForfeitChallenge =
    // (1) Must be enrolled in the challenge
    // (2) Challenge must not already be completed
    // (3) Challenge must not already be forfeited
    !!userChallenge && !userChallenge.completedAt && !userChallenge.forfeitedAt;

  if (!challenge) {
    return <Skeleton />;
  }

  return (
    <Box>
      <Box
        onClick={() => {
          history.goBack();
        }}
      >
        <IconButton edge="start" className={classes.backIcon}>
          <BackArrow height="1.5em" width="1.5em" />
        </IconButton>
      </Box>

      {canForfeitChallenge && (
        <>
          <IconButton
            edge="end"
            color="primary"
            onClick={handleMenuClick}
            className={classes.menuIcon}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                console.log('Forfeit Challenge');
              }}
            >
              Forfeit Challenge
            </MenuItem>
          </Menu>
        </>
      )}

      <ChallengeContent
        challenge={challenge}
        userChallenge={userChallenge}
        tasks={tasks}
        currentUser={user}
        posts={posts}
      />
    </Box>
  );
};

export default ChallengeDetailsPage;
