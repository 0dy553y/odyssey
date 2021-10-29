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
import { getFriendPostList, getCommunityPostList } from 'store/posts/selectors';
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
}

const FeedPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
      ongoingAndCompletedChallenges: [],
    }
  );

  useEffect(() => {
    api.challenges.getOngoingAndCompletedChallengeList().then((resp) => {
      setState({
        ongoingAndCompletedChallenges: resp.payload.data,
      });
    });
    dispatch(loadAllPosts());
  }, []);

  const renderContent = () => {
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
