import { PostListData, PostPostData, ReactionPostData } from 'types/posts';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

class PostsAPI extends BaseAPI {
  protected static getPostsUrl(): string {
    return 'posts';
  }

  public getFriendPostsList(): ApiPromise<PostListData[]> {
    return this.get(`${PostsAPI.getPostsUrl()}/friend_posts`);
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

  public removeReaction(
    postId: number,
    reactionPostData: ReactionPostData
  ): ApiPromise<PostListData> {
    return this.post(
      `${PostsAPI.getPostsUrl()}/${postId}/remove_reaction`,
      reactionPostData
    );
  }

  public createPost(postPostData: PostPostData): ApiPromise<PostListData> {
    return this.post(`${PostsAPI.getPostsUrl()}`, postPostData);
  }
}

export default PostsAPI;
