# frozen_string_literal: true

class FriendsController < ApplicationController
  # helper to have access to methods in templates
  helper Base64Helper

  def index
    @friends = current_user.friends
  end

  def search
    @users = User.where('username LIKE ?', "%#{params.require(:query)}%").where(is_system_account: false)
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
