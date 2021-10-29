import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Box,
  Container,
  Fab,
  Theme,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { FeedPost } from 'components/feed/FeedPost';
import { FeedPostSkeleton } from 'components/feed/FeedPostSkeleton';

import {
  loadAllPosts,
  addReactionToPost,
  removeReactionFromPost,
} from 'store/posts/operations';
import { getFriendPostList } from 'store/posts/selectors';
import { getUser } from 'store/auth/selectors';
import { ReactionEmoji, PostListData } from 'types/posts';
import { createNewPost } from 'store/posts/operations';
import { CreatePostModal } from 'components/feed/CreatePostModal';
import { ChallengeListData } from 'types/challenges';
import api from 'api';
import { MemoizedFeedPostList } from 'components/feed/FeedPostList';

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
  fab: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(8),
    backgroundColor: 'black',
    color: 'white',
  },
}));

interface FeedPageState {
  selectedToggle: 'friends' | 'community';
  isCreatePostModalOpen: boolean;
  ongoingAndCompletedChallenges: ChallengeListData[];
  friendPosts: PostListData[];
  communityPosts: PostListData[];
  isLoading: boolean;
}

const FeedPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const posts = useSelector(getFriendPostList);
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
      ongoingAndCompletedChallenges: [],
      friendPosts: [],
      communityPosts: [],
      isLoading: true,
    }
  );

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    const p1 = api.challenges
      .getOngoingAndCompletedChallengeList()
      .then((resp) => {
        setState({
          ongoingAndCompletedChallenges: resp.payload.data,
        });
      });
    const p2 = api.posts.getCommunityPostsList().then((resp) => {
      setState({
        communityPosts: resp.payload.data,
      });
    });
    const p3 = api.posts.getFriendPostsList().then((resp) => {
      setState({
        friendPosts: resp.payload.data,
      });
    });
    Promise.all([p1, p2, p3]).then(() => setState({ isLoading: false }));
  };

  const renderContent = () => {
    if (state.isLoading) {
      // 5 is just some arbitrary number
      return Array.from({ length: 5 }).map((_, idx) => (
        <FeedPostSkeleton key={idx} />
      ));
    }
    return (
      <MemoizedFeedPostList
        posts={
          state.selectedToggle === 'friends'
            ? state.friendPosts
            : state.communityPosts
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
        marginTop: 2,
        padding: '2em 1.5em 0 1.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

      {renderContent()}

      <Fab
        className={classes.fab}
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
