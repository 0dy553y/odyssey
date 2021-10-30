# frozen_string_literal: true

class FriendsController < ApplicationController
  include UserHelper

  def index
    @friends = user.friends
  end

  def search
    @users = User.where('username ILIKE ?', "%#{params.require(:query)}%").where(is_system_account: false)
  end

  def status
    status = {
      friends: 0,
      friend_request_sent: 1,
      friend_request_received: 2,
      not_friends: 3,
      self: 4
    }

    @friend_status = status[:not_friends]
    other_user = User.find(params.require(:id))
    if current_user == other_user
      @friend_status = status[:self]
    elsif current_user.friends.include? other_user
      @friend_status = status[:friends]
    elsif current_user.sent_pending_friends.include? other_user
      @friend_status = status[:friend_request_sent]
      @friend_request = FriendRequest.find_by(sender_id: current_user.id, receiver_id: other_user.id)
    elsif current_user.received_pending_friends.include? other_user
      @friend_status = status[:friend_request_received]
      @friend_request = FriendRequest.find_by(sender_id: other_user.id, receiver_id: current_user.id)
    end
  end

  def destroy
    id = params.require(:id)
    friendship = Friendship
                 .find_by('(first_user_id = ? AND second_user_id = ?) OR (first_user_id = ? AND second_user_id = ?)',
                          id, current_user.id, current_user.id, id)
    if friendship.nil?
      show_error_message('Friend cannot be found')
      render 'layouts/empty', status: :not_found
      return
    end
    friendship.destroy!

    removed_friend = User.find(id)
    show_success_message("Successfully removed '#{removed_friend.display_name || removed_friend.username}' as friend!")
    render 'layouts/empty', status: :ok
  end
end
