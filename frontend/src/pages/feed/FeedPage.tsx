import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Theme,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FeedPost } from 'components/feed/FeedPost';
import {
  loadAllPosts,
  addReactionToPost,
  removeReactionFromPost,
} from 'store/posts/operations';
import { getPostList } from 'store/posts/selectors';
import { getUser } from 'store/auth/selectors';
import { ReactionEmoji } from 'types/posts';

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
}));

const FeedPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const posts = useSelector(getPostList);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //

  const [selectedToggle, setSelectedToggle] = useState<'friends' | 'community'>(
    'friends'
  );

  useEffect(() => {
    dispatch(loadAllPosts());
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
            value={selectedToggle}
            onChange={(
              _: React.MouseEvent<HTMLElement>,
              newToggleValue: 'friends' | 'community'
            ) => {
              setSelectedToggle(newToggleValue);
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
        </>
      )}
    </>
  );
};

export default FeedPage;
