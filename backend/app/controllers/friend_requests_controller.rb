# frozen_string_literal: true

class FriendRequestsController < ApplicationController
  # helper to have access to methods in templates
  helper Base64Helper

  def index
    @friend_requests = current_user.received_friend_requests
  end

  def create
    FriendRequest.create!(sender_id: current_user.id, receiver_id: params.require(:receiver_id))

    render 'layouts/empty', status: :created
  end

  def update
    friend_request = FriendRequest.find(params.require(:id))
    if friend_request.receiver_id != current_user.id
      show_error_message('Unable to accept invalid friend request')
      render 'layouts/empty', status: :forbidden
      return
    end
    first_user_id = [friend_request.sender_id, friend_request.receiver_id].min
    second_user_id = [friend_request.sender_id, friend_request.receiver_id].max
    ActiveRecord::Base.transaction do
      friend_request.destroy!
      Friendship.create!(first_user_id: first_user_id, second_user_id: second_user_id)
    end

    render 'layouts/empty', status: :ok
  end

  def destroy
    friend_request = FriendRequest.find(params.require(:id))
    if friend_request.receiver_id != current_user.id
      show_error_message('Unable to delete invalid friend request')
      render 'layouts/empty', status: :forbidden
      return
    end
    friend_request.destroy!

    render 'layouts/empty', status: :ok
  end
end
