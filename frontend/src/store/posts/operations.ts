import api from 'api';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/index';
import { PostListData, ReactionEmoji } from 'types/posts';
import { OperationResult } from 'types/store';
import { setPostList, updatePost } from './actions';

export function loadAllPosts(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.posts.getPostsList();
    const posts: PostListData[] = response.payload.data.map((datum) => {
      return {
        ...datum,
        createdAt: new Date(datum.createdAt),
      };
    });
    dispatch(setPostList(posts));
  };
}

export function addReactionToPost(
  postId: number,
  emoji: ReactionEmoji
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.posts.addReaction(postId, {
      emoji,
    });

    const post: PostListData = {
      ...response.payload.data,
      createdAt: new Date(response.payload.data.createdAt),
    };
    dispatch(updatePost(post));
  };
}

export function removeReactionFromPost(
  postId: number,
  emoji: ReactionEmoji
): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.posts.removeReaction(postId, {
      emoji,
    });

    const post: PostListData = {
      ...response.payload.data,
      createdAt: new Date(response.payload.data.createdAt),
    };
    dispatch(updatePost(post));
  };
}
