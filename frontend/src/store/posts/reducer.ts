import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostListData } from 'types/posts';
import { PostsState } from './types';

const initialState: PostsState = {
  friendPostList: [],
  communityPostList: [],
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
    updatePost: (state, action: PayloadAction<PostListData>): void => {
      const newPost = action.payload;

      const friendPostIds = state.friendPostList.map((post) => post.id);
      const friendPostIdx = friendPostIds.indexOf(newPost.id);
      if (friendPostIdx !== -1) {
        state.friendPostList = state.friendPostList
          .slice(0, friendPostIdx)
          .concat([newPost])
          .concat(state.friendPostList.slice(friendPostIdx + 1));
      }

      const communityPostIds = state.communityPostList.map((post) => post.id);
      const communityPostIdx = communityPostIds.indexOf(newPost.id);
      if (communityPostIdx !== -1) {
        state.communityPostList = state.communityPostList
          .slice(0, communityPostIdx)
          .concat([newPost])
          .concat(state.communityPostList.slice(communityPostIdx + 1));
      }
    },
  },
});

export default postsSlice.reducer;
