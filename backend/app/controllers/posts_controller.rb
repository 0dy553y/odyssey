# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    friend_ids = current_user.friends.pluck(:id)
    friend_and_self_ids = friend_ids + [current_user.id]

    @posts = Post.includes(:post_reactions, :creator).where(creator_id: friend_and_self_ids)
  end

  def create
    Post.create!(post_params)

    render 'layouts/empty', status: :created
  end

  private

  def post_params
    params
      .require(:post)
      .permit(:challenge_id, :body)
      .with_defaults(creator_id: current_user.id)
  end
end
