import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostListData } from 'types/posts';
import { PostsState } from './types';

const initialState: PostsState = {
  postList: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostList: (state, action: PayloadAction<PostListData[]>): void => {
      state.postList = action.payload;
    },
  },
});

export default postsSlice.reducer;
