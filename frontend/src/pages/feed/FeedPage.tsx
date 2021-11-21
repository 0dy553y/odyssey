import React, { useEffect, useRef, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Box,
  Fab,
  Grid,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddIcon from '@mui/icons-material/AddRounded';
import { makeStyles } from '@mui/styles';
import {
  loadAllPosts,
  addReactionToPost,
  removeReactionFromPost,
} from 'store/posts/operations';
import { getFriendPostList, getCommunityPostList } from 'store/posts/selectors';
import { getUser } from 'store/auth/selectors';
import { ReactionEmoji, PostListData } from 'types/posts';
import { createNewPost } from 'store/posts/operations';
import { CreatePostModal } from 'components/feed/CreatePostModal';
import { ChallengeListData } from 'types/challenges';
import api from 'api';
import { MemoizedFeedPostList } from 'components/feed/FeedPostList';
import { useIsDesktop } from 'utils/windowSize';
import astronaut from 'assets/gifs/obebebe.gif';

const useStyles = makeStyles((theme: Theme) => ({
  toggleButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    [theme.breakpoints.between('xs', 'md')]: {
      width: '30vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '10em',
    },
    height: '2em',
    textTransform: 'none',
    borderRadius: '1em',
  },
  toggleButtonSelected: {
    color: 'white !important',
    background: 'black !important',
    transition: '0.4s',
  },
  feedContainer: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
  },
  baseFab: {
    position: 'absolute',
    backgroundColor: 'black',
    color: 'white',
  },
  mobileFab: {
    right: theme.spacing(2),
    bottom: theme.spacing(8),
  },
  desktopFab: {
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
  text: {
    color: 'gray',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 100,
  },
  astronaut: {
    maxHeight: '5em',
    marginBottom: '1em',
  },
}));

interface FeedPageState {
  selectedToggle: 'friends' | 'community';
  isCreatePostModalOpen: boolean;
  isFetchingPosts: boolean;
  shouldShowLoading: boolean;
  ongoingAndCompletedChallenges: ChallengeListData[];
}

const FeedPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isDesktop = useIsDesktop();

  const friendPosts: PostListData[] = useSelector(getFriendPostList);
  const communityPosts: PostListData[] = useSelector(getCommunityPostList);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //

  const [state, setState] = useReducer(
    (state: FeedPageState, newState: Partial<FeedPageState>) => ({
      ...state,
      ...newState,
    }),
    {
      selectedToggle: 'friends',
      isCreatePostModalOpen: false,
      isFetchingPosts: true,
      shouldShowLoading: false,
      ongoingAndCompletedChallenges: [],
    }
  );

  const feedContainerRef = useRef<HTMLDivElement | null>();

  useEffect(() => {
    api.challenges.getOngoingAndCompletedChallengeList().then((resp) => {
      setState({
        ongoingAndCompletedChallenges: resp.payload.data,
      });
    });
    dispatch(loadAllPosts(() => setState({ isFetchingPosts: false })));
    setTimeout(() => {
      setState({ shouldShowLoading: true });
    }, 200);
  }, []);

  const renderContent = () => {
    if (state.isFetchingPosts) {
      return state.shouldShowLoading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <img src={astronaut} className={classes.astronaut} />
          <Typography className={classes.text} align="center">
            Loading posts...
          </Typography>
        </Grid>
      ) : (
        <></>
      );
    }
    return (
      <MemoizedFeedPostList
        posts={
          state.selectedToggle === 'friends' ? friendPosts : communityPosts
        }
        currentUserId={user.id}
        addReaction={(reaction: ReactionEmoji, post: PostListData) => {
          dispatch(addReactionToPost(post.id, reaction));
        }}
        removeReaction={(reaction: ReactionEmoji, post: PostListData) => {
          dispatch(removeReactionFromPost(post.id, reaction));
        }}
      />
    );
  };
  return (
    <Box
      sx={{
        padding: '2em 1.5em 0 1.5em',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <ToggleButtonGroup
        exclusive
        className={classes.toggleButtonContainer}
        value={state.selectedToggle}
        onChange={(
          _: React.MouseEvent<HTMLElement>,
          newToggleValue: 'friends' | 'community' | null
        ) => {
          // Disallow unselection of toggle
          if (newToggleValue === null) {
            return;
          }

          feedContainerRef.current?.scrollTo(0, 0);

          setState({ selectedToggle: newToggleValue });
        }}
      >
        <ToggleButton
          value="friends"
          aria-label="friends"
          classes={{
            root: classes.toggleButton,
            selected: classes.toggleButtonSelected,
          }}
        >
          Friends
        </ToggleButton>
        <ToggleButton
          value="community"
          aria-label="community"
          classes={{
            root: classes.toggleButton,
            selected: classes.toggleButtonSelected,
          }}
        >
          Community
        </ToggleButton>
      </ToggleButtonGroup>

      <Box className={classes.feedContainer} ref={feedContainerRef}>
        {renderContent()}
      </Box>

      <Fab
        className={`${classes.baseFab} ${
          isDesktop ? classes.desktopFab : classes.mobileFab
        }`}
        onClick={() => setState({ isCreatePostModalOpen: true })}
      >
        <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          badgeContent={<AddIcon sx={{ fontSize: '1.2em' }} />}
          overlap="circular"
        >
          <CreateOutlinedIcon />
        </Badge>
      </Fab>
      <CreatePostModal
        isOpen={state.isCreatePostModalOpen}
        onClose={() => setState({ isCreatePostModalOpen: false })}
        onSubmit={(data) => {
          if (!data.challengeId || typeof data.challengeId === 'string') {
            throw new Error('Challenge ID must be present');
          }

          dispatch(
            createNewPost({
              challengeId: data.challengeId,
              body: data.body,
            })
          );
          setState({ isCreatePostModalOpen: false });
        }}
        challenges={state.ongoingAndCompletedChallenges}
      />
    </Box>
  );
};

export default FeedPage;
