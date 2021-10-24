# frozen_string_literal: true

class PostsController < ApplicationController
  # helper to have access to methods in templates
  helper Base64Helper

  def index
    friend_ids = current_user.friends.pluck(:id)
    friend_and_self_ids = friend_ids + [current_user.id]

    @posts = Post.includes(:post_reactions, :creator).where(creator_id: friend_and_self_ids)
  end

  def create
    @post = Post.create!(post_params)

    render 'posts/show', status: :created
  end

  def add_reaction
    post = Post.find(params[:id])
    post.post_reactions << PostReaction.new(reaction_params)
    post.save!

    render 'posts/show', status: :created
  end

  private

  def post_params
    params
      .require(:post)
      .permit(:challenge_id, :body)
      .with_defaults(creator_id: current_user.id)
  end

  def reaction_params
    params
      .require(:reaction)
      .permit( :emoji)
      .with_defaults(creator_id: current_user.id)
  end
end
