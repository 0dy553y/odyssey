import { PostListData, PostPostData, ReactionPostData } from 'types/posts';
import { ApiPromise } from '../types/api';
import BaseAPI from './base';

type PseudoPostListData = Omit<PostListData, 'createdAt'> & {
  createdAt: string;
};

const postListDataMapper = (post: PseudoPostListData): PostListData => {
  return {
    ...post,
    createdAt: new Date(post.createdAt),
  };
};

class PostsAPI extends BaseAPI {
  protected static getPostsUrl(): string {
    return 'posts';
  }

  public getFriendPostsList(): ApiPromise<PostListData[]> {
    return this.get(`${PostsAPI.getPostsUrl()}/friend_posts`).then((resp) => {
      const data = (resp.payload.data as PseudoPostListData[]).map(
        postListDataMapper
      );
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public getCommunityPostsList(): ApiPromise<PostListData[]> {
    return this.get(`${PostsAPI.getPostsUrl()}/community_posts`).then(
      (resp) => {
        const data = (resp.payload.data as PseudoPostListData[]).map(
          postListDataMapper
        );
        return {
          ...resp,
          payload: {
            data,
          },
        };
      }
    );
  }

  public getPostsListForChallenge(
    challengeId: number
  ): ApiPromise<PostListData[]> {
    return this.get(
      `${PostsAPI.getPostsUrl()}/posts_for_challenge?challengeId=${challengeId}`
    ).then((resp) => {
      const data = (resp.payload.data as PseudoPostListData[]).map(
        postListDataMapper
      );
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public getPostsListForUser(username?: string): ApiPromise<PostListData[]> {
    return this.get(
      `${PostsAPI.getPostsUrl()}/posts_for_user?username=${username ?? ''}`
    ).then((resp) => {
      const data = (resp.payload.data as PseudoPostListData[]).map(
        postListDataMapper
      );
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public addReaction(
    postId: number,
    reactionPostData: ReactionPostData
  ): ApiPromise<PostListData> {
    return this.post(
      `${PostsAPI.getPostsUrl()}/${postId}/add_reaction`,
      reactionPostData
    ).then((resp) => {
      const data = postListDataMapper(resp.payload.data as PseudoPostListData);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public removeReaction(
    postId: number,
    reactionPostData: ReactionPostData
  ): ApiPromise<PostListData> {
    return this.post(
      `${PostsAPI.getPostsUrl()}/${postId}/remove_reaction`,
      reactionPostData
    ).then((resp) => {
      const data = postListDataMapper(resp.payload.data as PseudoPostListData);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }

  public createPost(postPostData: PostPostData): ApiPromise<PostListData> {
    return this.post(`${PostsAPI.getPostsUrl()}`, postPostData).then((resp) => {
      const data = postListDataMapper(resp.payload.data as PseudoPostListData);
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
  }
}

export default PostsAPI;
