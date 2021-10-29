# frozen_string_literal: true

module Auth
  class SessionsController < DeviseTokenAuth::SessionsController
    private

    def render_create_success
      show_success_message("Welcome, #{@resource.username}!")
      render 'auth/user', status: :created
    end

    def render_destroy_success
      show_success_message('Successfully logged out!')
      render 'layouts/empty', status: :ok
    end
  end
end
