import { UserData } from './auth';

export interface PostListData {
  id: number;
  body: string;
  createdAt: Date;
  creator: Omit<UserData, 'registrationDate'>;
  reactions: ReactionListData[];
}

export interface ReactionListData {
  emoji: ReactionEmoji;
  creator: Omit<UserData, 'registrationDate'>;
}

export enum ReactionEmoji {
  Smiley = 'Smiley',
  Poop = 'Poop',
  PartyPopper = 'Party Popper',
  SparklingHeart = 'Sparkling Heart',
  Crying = 'Crying',
  MoonFace = 'Moon Face',
}
