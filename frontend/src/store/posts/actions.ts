import { postsSlice } from './reducer';

export const {
  setFriendPostList,
  prependPostToFriendPostList,
  setCommunityPostList,
  prependPostToCommunityPostList,
  setUserPostList,
  updatePost,
  setChallengePostList,
  prependPostToChallengePostList,
  resetPosts,
} = postsSlice.actions;
