import { UserData } from './auth';

export interface PostListData {
  id: number;
  body: string;
  createdAt: Date;
  creator: Omit<UserData, 'registrationDate'>;
  reactions: ReactionListData[];
}

export interface PostPostData {
  challengeId: number;
  body: string;
}

export interface ReactionListData {
  emoji: ReactionEmoji;
  creator: Omit<UserData, 'registrationDate'>;
}

export enum ReactionEmoji {
  Smiley = '😃',
  Poop = '💩',
  PartyPopper = '🎉',
  SparklingHeart = '💖',
  Crying = '😭',
  MoonFace = '🌚️',
}

export interface ReactionPostData {
  emoji: ReactionEmoji;
}
