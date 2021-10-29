import { PostListData, PostPostData, ReactionPostData } from 'types/posts';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

type PseudoPostListData = Omit<PostListData, 'createdAt'> & {
  createdAt: string;
};

const mapPostListData = (data: PseudoPostListData[]): PostListData[] =>
  data.map((post: PseudoPostListData) => {
    return {
      ...post,
      createdAt: new Date(post.createdAt),
    };
  });

class PostsAPI extends BaseAPI {
  protected static getPostsUrl(): string {
    return 'posts';
  }

  public getFriendPostsList(): ApiPromise<PostListData[]> {
    return this.get(`${PostsAPI.getPostsUrl()}/friend_posts`).then((resp) => {
      const data = mapPostListData(resp.payload.data as PseudoPostListData[]);
      return {
        ...resp,
        payload: {
          data: data,
        },
      };
    });
  }

  public getCommunityPostsList(): ApiPromise<PostListData[]> {
    return this.get(`${PostsAPI.getPostsUrl()}/community_posts`).then(
      (resp) => {
        const data = mapPostListData(resp.payload.data as PseudoPostListData[]);
        return {
          ...resp,
          payload: {
            data: data,
          },
        };
      }
    );
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
