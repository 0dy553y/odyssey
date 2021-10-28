import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
  Typography,
  Grid,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import UserAvatar from 'components/common/userAvatar';
import { PostListData, ReactionEmoji, ReactionListData } from 'types/posts';
import { displayDateWithTimestamp, displayUsername } from 'utils/formatting';
import { getDateFromNowString } from 'utils/date';
import { ReactionChip } from './ReactionChip';
import { ReactionPicker } from './ReactionPicker';

interface FeedPostProps {
  post: PostListData;
  currentUserId: number;
  addReaction: (reaction: ReactionEmoji) => void;
  removeReaction: (reaction: ReactionEmoji) => void;
}

const useStyles = makeStyles(() => ({
  subtitle: {
    color: '#A5A5A5',
  },
  emojiChip: {
    margin: 2,
  },
  reactionPicker: {
    marginLeft: 2,
    display: 'flex',
    alignItems: 'center',
  },
  displayLinebreak: {
    whiteSpace: 'pre-line',
  },
}));

const getAggregatedReactions = (
  reactions: ReactionListData[],
  currentUserId: number
): {
  emoji: ReactionEmoji;
  count: number;
  hasReacted: boolean;
}[] => {
  const emojiMap: Map<ReactionEmoji, { count: number; hasReacted: boolean }> =
    new Map();

  reactions.forEach((reaction) => {
    const prevVal = emojiMap.get(reaction.emoji) ?? {
      count: 0,
      hasReacted: false,
    };
    const updatedVal = {
      count: prevVal.count + 1,
      hasReacted: prevVal.hasReacted || currentUserId == reaction.creator.id,
    };
    emojiMap.set(reaction.emoji, updatedVal);
  });

  const aggregatedData: {
    emoji: ReactionEmoji;
    count: number;
    hasReacted: boolean;
  }[] = [];

  Object.values(ReactionEmoji).forEach((emoji) => {
    const data = emojiMap.get(emoji as ReactionEmoji);

    if (!data) {
      return;
    }

    aggregatedData.push({
      emoji: emoji as ReactionEmoji,
      count: data.count,
      hasReacted: data.hasReacted,
    });
  });

  return aggregatedData;
};

export const FeedPost: React.FC<FeedPostProps> = ({
  post,
  currentUserId,
  addReaction,
  removeReaction,
}) => {
  const classes = useStyles();

  const creator = post.creator;
  const aggregatedReactionData = getAggregatedReactions(
    post.reactions,
    currentUserId
  );

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          src={creator.avatar}
          username={creator.username}
          displayName={creator.displayName}
        />
      </ListItemAvatar>
      <Grid container alignItems="center">
        <ListItemText
          primary={creator.displayName ?? displayUsername(creator.username)}
        />
        <Grid item xs={12} className={classes.displayLinebreak}>
          {post.body}
        </Grid>
        <Grid item xs={12}>
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
        </Grid>

        {aggregatedReactionData.map((data) => {
          return (
            <Grid item key={data.emoji} className={classes.emojiChip}>
              <ReactionChip
                reaction={data.emoji}
                count={data.count}
                hasReacted={data.hasReacted}
                onClick={() => {
                  if (data.hasReacted) {
                    removeReaction(data.emoji);
                  } else {
                    addReaction(data.emoji);
                  }
                }}
              />
            </Grid>
          );
        })}
        <Grid item className={classes.reactionPicker}>
          <ReactionPicker
            onReactionSelect={(reaction) => addReaction(reaction)}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};
