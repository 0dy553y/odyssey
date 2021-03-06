import { PostListData } from 'types/posts';
import { RootState } from '../index';
import { PostsState } from './types';

function getLocalState(state: RootState): PostsState {
  return state.posts;
}

export function getFriendPostList(state: RootState): PostListData[] {
  return getLocalState(state).friendPostList;
}

export function getCommunityPostList(state: RootState): PostListData[] {
  return getLocalState(state).communityPostList;
}

export function getUserPostList(state: RootState): PostListData[] {
  return getLocalState(state).userPostList;
}

export function getChallengePostList(
  state: RootState,
  challengeId: number
): PostListData[] {
  return getLocalState(state).challengePostLists[challengeId] ?? [];
}
