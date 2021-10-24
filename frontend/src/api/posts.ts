import { PostListData, ReactionPostData } from 'types/posts';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class PostsAPI extends BaseAPI {
  protected static getPostsUrl(): string {
    return 'posts';
  }

  public getPostsList(): ApiPromise<PostListData[]> {
    return this.get(PostsAPI.getPostsUrl());
  }

  public addReaction(
    postId: number,
    reactionPostData: ReactionPostData
  ): ApiPromise<PostListData> {
    return this.post(
      `${PostsAPI.getPostsUrl()}/${postId}/add_reaction`,
      reactionPostData
    );
  }
}

export default PostsAPI;
