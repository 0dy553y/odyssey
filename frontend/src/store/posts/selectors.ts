import { PostListData } from 'types/posts';
import { RootState } from '../index';
import { PostsState } from './types';

function getLocalState(state: RootState): PostsState {
  return state.posts;
}

export function getPostList(state: RootState): PostListData[] {
  return getLocalState(state).postList;
}
