import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { FeedPost } from 'components/feed/FeedPost';
import { loadAllPosts } from 'store/posts/operations';
import { getPostList } from 'store/posts/selectors';

const FeedPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllPosts());
  }, []);

  const posts = useSelector(getPostList);

  return (
    <>
      <Typography variant="h5">Upcoming :-)</Typography>
      <img src="https://i.redd.it/ox49yfg9vn461.jpg" style={{ width: '80%' }} />

      {process.env.NODE_ENV === 'development' && (
        <>
          {posts.map((post) => (
            <FeedPost key={post.id} post={post} currentUserId={1} />
          ))}
        </>
      )}
    </>
  );
};

export default FeedPage;
