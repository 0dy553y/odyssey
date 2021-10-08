# frozen_string_literal: true

module AuthHelper
  def render_error(status, message, _data = nil)
    @errors = message
    show_error_message(message)
    render 'auth/user', status: status
  end
end
