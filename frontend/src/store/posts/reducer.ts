import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostListData } from 'types/posts';
import { PostsState } from './types';

const initialState: PostsState = {
  friendPostList: [],
  communityPostList: [],
  userPostList: [],
  challengePostLists: {},
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFriendPostList: (state, action: PayloadAction<PostListData[]>): void => {
      state.friendPostList = action.payload;
    },
    prependPostToFriendPostList: (
      state,
      action: PayloadAction<PostListData>
    ): void => {
      state.friendPostList = [action.payload, ...state.friendPostList];
    },
    setCommunityPostList: (
      state,
      action: PayloadAction<PostListData[]>
    ): void => {
      state.communityPostList = action.payload;
    },
    prependPostToCommunityPostList: (
      state,
      action: PayloadAction<PostListData>
    ): void => {
      state.communityPostList = [action.payload, ...state.communityPostList];
    },
    setUserPostList: (state, action: PayloadAction<PostListData[]>): void => {
      state.userPostList = action.payload;
    },
    updatePost: (state, action: PayloadAction<PostListData>): void => {
      const newPost = action.payload;

      state.friendPostList = updatedPostListWithPost(
        newPost,
        state.friendPostList
      );

      state.communityPostList = updatedPostListWithPost(
        newPost,
        state.communityPostList
      );

      state.userPostList = updatedPostListWithPost(newPost, state.userPostList);

      const challengePostList = updatedPostListWithPost(
        newPost,
        state.challengePostLists[newPost.challenge.id] ?? []
      );
      state.challengePostLists[newPost.challenge.id] = challengePostList;
    },
    prependPostToChallengePostList: (
      state,
      action: PayloadAction<{ challengeId: number; post: PostListData }>
    ): void => {
      const challengeId = action.payload.challengeId;
      const post = action.payload.post;

      const postList = state.challengePostLists[challengeId] ?? [];
      state.challengePostLists[challengeId] = [post, ...postList];
    },
    setChallengePostList: (
      state,
      action: PayloadAction<{ challengeId: number; posts: PostListData[] }>
    ): void => {
      const challengeId = action.payload.challengeId;
      const posts = action.payload.posts;
      state.challengePostLists[challengeId] = posts;
    },
    resetPosts: (state): void => {
      state.friendPostList = [];
      state.communityPostList = [];
      state.userPostList = [];
      state.challengePostLists = [];
    },
  },
});

const updatedPostListWithPost = (
  newPost: PostListData,
  posts: PostListData[]
) => {
  const postIds = posts.map((post) => post.id);
  const postIdx = postIds.indexOf(newPost.id);

  if (postIdx === -1) {
    return posts;
  }

  return posts
    .slice(0, postIdx)
    .concat([newPost])
    .concat(posts.slice(postIdx + 1));
};

export default postsSlice.reducer;
