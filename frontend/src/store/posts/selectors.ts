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
