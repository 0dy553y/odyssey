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
    updatePost: (state, action: PayloadAction<PostListData>): void => {
      const newPost = action.payload;

      const ids = state.postList.map((post) => post.id);
      const idx = ids.indexOf(newPost.id);

      if (idx === -1) {
        throw new Error('Post does not exist');
      }

      state.postList = state.postList
        .slice(0, idx)
        .concat([newPost])
        .concat(state.postList.slice(idx + 1));
    },
  },
});

export default postsSlice.reducer;
