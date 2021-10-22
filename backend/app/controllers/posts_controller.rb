# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    friend_ids = current_user.friends.pluck(:id)
    friend_and_self_ids = friend_ids + [current_user.ids]

    @posts = Post.includes(:post_reactions, :creator).where(creator_id: friend_and_self_ids)
  end
end
