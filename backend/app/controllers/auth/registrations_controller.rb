# frozen_string_literal: true

module Auth
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    include AuthHelper
    include Base64Helper

    private

    def update
      super do |resource|
        resource.avatar.attach(decoded_file(params[:avatar]))
      end
    end

    def render_create_success
      show_success_message("Successfully registered with username '#{@resource.username}'!")
      render 'auth/user', status: :created
    end

    def render_create_error
      show_error_message("Unable to register with username '#{@resource.username}'")
      render 'auth/user', status: :unprocessable_entity
    end

    def render_update_success
      show_success_message('Successfully updated profile!')
      render 'auth/user', status: :ok
    end

    def render_update_error
      show_error_message('Unable to update profile')
      render 'auth/user', status: :unprocessable_entity
    end

    def render_destroy_success
      show_success_message("Successfully deleted user with username '#{@resource.username}'!")
      render 'layouts/empty', status: :ok
    end
  end
end
