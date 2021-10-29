# frozen_string_literal: true

module Auth
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    include AuthHelper

    private

    def render_validate_token_success
      show_success_message("Welcome back, #{@resource.username}!")
      render 'auth/user', status: :ok
    end

    def render_validate_token_error
      show_error_message('Token is not valid!')
      render 'layouts/empty', status: :unauthorized
    end
  end
end
