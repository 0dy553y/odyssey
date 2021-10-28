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
    addPost: (state, action: PayloadAction<PostListData>): void => {
      // Add post to the front.
      // Assumption is that post to be added is newly created
      // and that the postList contains post sorted in desc order
      state.postList = [action.payload].concat([...state.postList]);
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
