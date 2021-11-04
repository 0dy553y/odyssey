import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Link,
  Tooltip,
  Typography,
  Grid,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import UserAvatar from 'components/common/userAvatar';
import { useHistory } from 'react-router-dom';
import { PostListData, ReactionEmoji, ReactionListData } from 'types/posts';
import { displayDateWithTimestamp, displayUsername } from 'utils/formatting';
import { ReactionChip } from './ReactionChip';
import { ReactionPicker } from './ReactionPicker';
import { CHALLENGE_ROUTE } from 'routing/routes';

interface FeedPostProps {
  post: PostListData;
  currentUserId: number;
  addReaction: (reaction: ReactionEmoji) => void;
  removeReaction: (reaction: ReactionEmoji) => void;
  shouldLinkToChallenge: boolean;
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
  displayLineBreak: {
    whiteSpace: 'pre-line',
  },
  wrapText: {
    wordBreak: 'break-word',
    hyphens: 'auto',
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
  shouldLinkToChallenge,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const creator = post.creator;
  const aggregatedReactionData = getAggregatedReactions(
    post.reactions,
    currentUserId
  );
  const disabledEmojis: ReactionEmoji[] = aggregatedReactionData
    .filter((data) => data.hasReacted)
    .map((data) => data.emoji);

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

        <Grid
          item
          xs={12}
          className={`${classes.displayLineBreak} ${classes.wrapText}`}
        >
          {post.body}
        </Grid>

        <Grid item xs={12}>
          <Link
            onClick={() => {
              if (!shouldLinkToChallenge) {
                return;
              }
              history.push(`${CHALLENGE_ROUTE}/${post.challenge.id}`);
            }}
            style={{ textDecoration: 'none' }}
          >
            <Typography component="span" variant="subtitle2">
              {post.challenge.name}
            </Typography>
          </Link>
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
              {dayjs(post.createdAt).fromNow()}
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
            disabledEmojis={disabledEmojis}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};
