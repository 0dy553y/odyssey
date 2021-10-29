import { postsSlice } from './reducer';

export const {
  setFriendPostList,
  prependPostToFriendPostList,
  setCommunityPostList,
  prependPostToCommunityPostList,
  updatePost,
} = postsSlice.actions;
