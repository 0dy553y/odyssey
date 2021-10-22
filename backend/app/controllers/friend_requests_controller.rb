# frozen_string_literal: true

class FriendRequestsController < ApplicationController
  def index
    @friend_requests = current_user.received_friend_requests
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
