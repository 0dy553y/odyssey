import * as React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import UserAvatar from 'components/common/userAvatar';
import { PostListData } from 'types/posts';
import { displayDateWithTimestamp, displayUsername } from 'utils/formatting';
import { getDateFromNowString } from 'utils/date';

interface FeedPostProps {
  post: PostListData;
}

const useStyles = makeStyles(() => ({
  subtitle: {
    color: '#A5A5A5',
  },
}));

export const FeedPost: React.FC<FeedPostProps> = ({ post }) => {
  const classes = useStyles();

  const creator = post.creator;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          src={creator.avatar}
          username={creator.username}
          displayName={creator.displayName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={creator.displayName ?? displayUsername(creator.username)}
        secondary={
          <>
            {post.body}
            <br />
            <Tooltip
              arrow
              title={displayDateWithTimestamp(post.createdAt)}
              leaveTouchDelay={1500}
              enterTouchDelay={50}
            >
              <Typography
                component="span"
                variant="subtitle2"
                className={classes.subtitle}
              >
                {getDateFromNowString(post.createdAt)}
              </Typography>
            </Tooltip>
          </>
        }
      />
    </ListItem>
  );
};
