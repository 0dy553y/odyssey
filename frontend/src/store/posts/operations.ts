import api from 'api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/index';
import { PostListData } from 'types/posts';
import { OperationResult } from 'types/store';
import { setPostList } from './actions';

export function loadAllPosts(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.posts.getPostsList();
    const posts: PostListData[] = response.payload.data;
    dispatch(setPostList(posts));
  };
}
