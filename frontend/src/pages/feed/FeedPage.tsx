import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { FeedPost } from 'components/feed/FeedPost';
import { loadAllPosts, addReactionToPost } from 'store/posts/operations';
import { getPostList } from 'store/posts/selectors';
import { getUser } from 'store/auth/selectors';
import { ReactionEmoji } from 'types/posts';

const FeedPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllPosts());
  }, []);

  const posts = useSelector(getPostList);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useSelector(getUser)!; //

  return (
    <>
      <Typography variant="h5">Upcoming :-)</Typography>
      <img src="https://i.redd.it/ox49yfg9vn461.jpg" style={{ width: '80%' }} />

      {process.env.NODE_ENV === 'development' && (
        <>
          {posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              currentUserId={user.id}
              addReaction={(reaction: ReactionEmoji) => {
                dispatch(addReactionToPost(post.id, reaction));
              }}
            />
          ))}
        </>
      )}
    </>
  );
};

export default FeedPage;
