import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
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
import {
  loadAllPosts,
  addReactionToPost,
  removeReactionFromPost,
} from 'store/posts/operations';
import { getPostList } from 'store/posts/selectors';
import { getUser } from 'store/auth/selectors';
import { ReactionEmoji, PostListData } from 'types/posts';
import { createNewPost } from 'store/posts/operations';
import { CreatePostModal } from 'components/feed/CreatePostModal';
import { ChallengeListData } from 'types/challenges';
import api from 'api';

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
}

const FeedPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const posts = useSelector(getPostList);
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
    }
  );

  useEffect(() => {
    dispatch(loadAllPosts());
    api.challenges.getOngoingAndCompletedChallengeList().then((resp) => {
      setState({
        ongoingAndCompletedChallenges: resp.payload.data,
      });
    });
  }, []);

  return (
    <>
      <Typography variant="h5">Upcoming :-)</Typography>
      <img src="https://i.redd.it/ox49yfg9vn461.jpg" style={{ width: '80%' }} />

      {process.env.NODE_ENV === 'development' && (
        <>
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

          {posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              currentUserId={user.id}
              addReaction={(reaction: ReactionEmoji) => {
                dispatch(addReactionToPost(post.id, reaction));
              }}
              removeReaction={(reaction: ReactionEmoji) => {
                dispatch(removeReactionFromPost(post.id, reaction));
              }}
            />
          ))}

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
        </>
      )}
    </>
  );
};

export default FeedPage;
