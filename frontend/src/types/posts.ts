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
  Smiley = 0,
  Poop = 1,
  PartyPopper = 2,
  SparklingHeart = 3,
  Crying = 4,
  MoonFace = 5,
}
