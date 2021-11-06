import React, { useEffect } from 'react';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  addReactionToPost,
  removeReactionFromPost,
  loadPostsForUser,
} from 'store/posts/operations';
import { RootState } from 'store';
import { getUser } from 'store/auth/selectors';
import { getUserByUsername } from 'store/users/selectors';
import { getUserPostList } from 'store/posts/selectors';
import { displayUsername } from 'utils/formatting';
import { loadUser } from 'store/users/operations';
import { PostListData, ReactionEmoji } from 'types/posts';
import { MemoizedFeedPostList } from 'components/feed/FeedPostList';

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useParams<{ username: string | undefined }>();

  const isOwnPostsPage = username === undefined;
  const user = isOwnPostsPage
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      useSelector(getUser)!
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      useSelector((state: RootState) => getUserByUsername(state, username!))!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentUser = useSelector(getUser)!;

  useEffect(() => {
    batch(() => {
      dispatch(loadUser(username));
      dispatch(loadPostsForUser(username));
    });
  }, []);

  const userPosts: PostListData[] = useSelector(getUserPostList);

  if (!user) {
    return <></>;
  }

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginLeft: '-1.5em' }}
            edge="start"
            onClick={() => history.goBack()}
          >
            <BackArrow filter="invert(1)" height="1.5em" width="1.5em" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography
        component="h1"
        variant="h4"
        className="header"
        style={{ fontFamily: 'Frock' }}
      >
        {isOwnPostsPage
          ? 'Your posts'
          : `${user.displayName ?? displayUsername(user.username)}'s posts`}
      </Typography>

      <MemoizedFeedPostList
        posts={userPosts}
        currentUserId={currentUser.id}
        addReaction={(reaction: ReactionEmoji, post: PostListData) => {
          dispatch(addReactionToPost(post.id, reaction));
        }}
        removeReaction={(reaction: ReactionEmoji, post: PostListData) => {
          dispatch(removeReactionFromPost(post.id, reaction));
        }}
        shouldLinkToChallenge={false}
      />
    </Box>
  );
};

export default PostsPage;
