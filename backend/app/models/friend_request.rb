# frozen_string_literal: true

class FriendRequest < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
  validate :no_friend_request_in_opposite_direction, :no_existing_friendship

  def no_friend_request_in_opposite_direction
    return if FriendRequest.find_by(sender_id: receiver.id, receiver_id: sender.id).blank?

    errors.add("A friend request already exists from #{receiver.display_name || receiver.username} " \
               "to #{sender.display_name || sender.username}!")
  end

  def no_existing_friendship
    first_user_id = [sender_id, receiver_id].min
    second_user_id = [sender_id, receiver_id].max
    return if Friendship.find_by(first_user_id: first_user_id, second_user_id: second_user_id).blank?

    errors.add("#{sender.display_name || sender.username} & #{receiver.display_name || receiver.username} " \
               'are already friends!')
  end
end
