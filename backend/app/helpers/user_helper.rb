# frozen_string_literal: true

module UserHelper
  def user
    user_id = params[:user_id]
    if user_id.present?
      User.find(user_id)
    else
      current_user
    end
  end
end
