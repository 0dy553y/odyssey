import React from 'react';
import Typography from '@mui/material/Typography';
import { FeedPost } from 'components/feed/FeedPost';
import { subDays } from 'date-fns/esm';
import { ReactionEmoji } from 'types/posts';

const FeedPage: React.FC = () => {
  const mockPost = {
    id: 1,
    body: `After a very LONG journey, I finally have reached the PINNACLE and completed the 3-day
    'Walking' challenge!!! I want to take time to thank my friends, family, and colleagues!
    Thank you for continuing to believe in me and pushing me towards success.
    Never ever give up folks. If you want something, go get it! Perseverance, GRIT,
    and passion go a long way.
    `,
    createdAt: subDays(new Date(), 7),
    creator: {
      id: 1,
      username: 'bobby',
    },
    reactions: [
      {
        emoji: ReactionEmoji.Crying,
        creator: {
          id: 1,
          username: 'bobby',
        },
      },
      {
        emoji: ReactionEmoji.Crying,
        creator: {
          id: 2,
          username: 'robby',
        },
      },
      {
        emoji: ReactionEmoji.Crying,
        creator: {
          id: 3,
          username: 'poppy',
        },
      },
      {
        emoji: ReactionEmoji.Smiley,
        creator: {
          id: 1,
          username: 'bobby',
        },
      },
      {
        emoji: ReactionEmoji.MoonFace,
        creator: {
          id: 1,
          username: 'bobby',
        },
      },
      {
        emoji: ReactionEmoji.PartyPopper,
        creator: {
          id: 1,
          username: 'bobby',
        },
      },
      {
        emoji: ReactionEmoji.Poop,
        creator: {
          id: 1,
          username: 'bobby',
        },
      },
      {
        emoji: ReactionEmoji.SparklingHeart,
        creator: {
          id: 1,
          username: 'bobby',
        },
      },
    ],
  };

  return (
    <>
      <Typography variant="h5">Upcoming :-)</Typography>
      <img src="https://i.redd.it/ox49yfg9vn461.jpg" style={{ width: '80%' }} />

      <FeedPost post={mockPost} currentUserId={1} />
      <FeedPost post={mockPost} currentUserId={1} />
      <FeedPost post={mockPost} currentUserId={1} />
      <FeedPost post={mockPost} currentUserId={1} />
    </>
  );
};

export default FeedPage;
