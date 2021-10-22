# frozen_string_literal: true

class FriendRequestsController < ApplicationController
  def index
    @friend_requests = current_user.received_friend_requests
  end
end
