import React, { memo } from 'react';
import { List, Typography } from '@mui/material';
import { ReactionEmoji, PostListData } from 'types/posts';
import { FeedPost } from 'components/feed/FeedPost';
import { makeStyles } from '@mui/styles';

interface FeedPostListProps {
  posts: PostListData[];
  currentUserId: number;
  addReaction: (reaction: ReactionEmoji, post: PostListData) => void;
  removeReaction: (reaction: ReactionEmoji, post: PostListData) => void;
}

const useStyles = makeStyles(() => ({
  textContainer: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'gray',
    marginLeft: 50,
    marginRight: 50,
  },
}));

const FeedPostList: React.FC<FeedPostListProps> = ({
  posts,
  currentUserId,
  addReaction,
  removeReaction,
}) => {
  const classes = useStyles();

  return posts.length > 0 ? (
    <List>
      {posts.map((post) => (
        <FeedPost
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          addReaction={(reaction) => addReaction(reaction, post)}
          removeReaction={(reaction) => removeReaction(reaction, post)}
        />
      ))}
    </List>
  ) : (
    <div className={classes.textContainer}>
      <Typography align="center" className={classes.text}>
        No posts found!
      </Typography>
    </div>
  );
};

export const MemoizedFeedPostList = memo(FeedPostList);
