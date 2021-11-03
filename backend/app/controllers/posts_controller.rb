# frozen_string_literal: true

class PostsController < ApplicationController
  include UserHelper

  def friend_posts
    friend_ids = current_user.friends.pluck(:id)
    friend_and_self_ids = friend_ids + [current_user.id]

    @posts = Post.includes(:post_reactions, :creator).where(creator_id: friend_and_self_ids)

    render 'posts/index', status: :ok
  end

  def community_posts
    challenge_ids = current_user.challenges.pluck(:id)

    @posts = Post.includes(:post_reactions, :creator).where(challenge_id: challenge_ids)

    render 'posts/index', status: :ok
  end

  def posts_for_challenge
    @posts = Post.includes(:post_reactions, :creator).where(challenge_id: params.require(:challenge_id))

    render 'posts/index', status: :ok
  end

  def posts_for_user
    @posts = Post.includes(:post_reactions, :creator).where(creator_id: user.id)

    render 'posts/index', status: :ok
  end

  def create
    @post = Post.create!(post_params)

    render 'posts/show', status: :created
  end

  def add_reaction
    @post = Post.find(params[:id])
    @post.post_reactions << PostReaction.new(reaction_params)
    @post.save!

    render 'posts/show', status: :ok
  end

  def remove_reaction
    reaction = PostReaction.where(post_id: params[:id]).find_by(reaction_params)
    @post = reaction.post
    reaction.destroy!

    render 'posts/show', status: :ok
  end

  private

  def post_params
    params
      .require(:post)
      .permit(:challenge_id, :body)
      .with_defaults(creator_id: current_user.id, challenge_id: params.require(:challenge_id))
  end

  def reaction_params
    params
      .permit(:emoji)
      .with_defaults(creator_id: current_user.id)
  end
end
