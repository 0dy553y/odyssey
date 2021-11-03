import { postsSlice } from './reducer';

export const {
  setFriendPostList,
  prependPostToFriendPostList,
  setCommunityPostList,
  prependPostToCommunityPostList,
  setUserPostList,
  updatePost,
  setChallengePostList,
  resetPosts,
} = postsSlice.actions;
