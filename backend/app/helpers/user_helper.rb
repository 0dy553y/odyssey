# frozen_string_literal: true

module UserHelper
  def user
    username = params[:username]
    if username.present?
      User.find_by(username: username, is_system_account: false)
    else
      current_user
    end
  end
end
