import api from 'api';
import { batch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/index';
import { PostPostData, ReactionEmoji } from 'types/posts';
import { OperationResult } from 'types/store';
import {
  prependPostToFriendPostList,
  setCommunityPostList,
  setFriendPostList,
  updatePost,
} from './actions';

export function loadAllPosts(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const friendPostsResp = await api.posts.getFriendPostsList();
    const communityPostsResp = await api.posts.getCommunityPostsList();

    batch(() => {
      dispatch(setFriendPostList(friendPostsResp.payload.data));
      dispatch(setCommunityPostList(communityPostsResp.payload.data));
    });
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

    dispatch(updatePost(response.payload.data));
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

    dispatch(updatePost(response.payload.data));
  };
}

export function createNewPost(postPostData: PostPostData): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.posts.createPost(postPostData);

    dispatch(prependPostToFriendPostList(response.payload.data));
  };
}
