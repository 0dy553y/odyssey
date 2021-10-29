import { PostListData } from 'types/posts';

type ChallengeId = number;

export interface PostsState {
  friendPostList: PostListData[];
  communityPostList: PostListData[];
  challengePostLists: Record<ChallengeId, PostListData[]>;
}
