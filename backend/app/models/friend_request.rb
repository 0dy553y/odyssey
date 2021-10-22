# frozen_string_literal: true

class FriendRequest < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
  validate :no_friend_request_in_opposite_direction

  def no_friend_request_in_opposite_direction
    return if FriendRequest.find_by(sender_id: receiver.id, receiver_id: sender.id).blank?

    errors.add("A friend request already exists from #{receiver.display_name || receiver.username} " \
               "to #{sender.display_name || sender.username}!")
  end
end
