# frozen_string_literal: true

module Auth
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    include AuthHelper
    # include to have access to methods in controller
    include Base64Helper
    # helper to have access to methods in templates
    helper Base64Helper

    def update
      super do |resource|
        next if params[:avatar].nil?

        type = get_file_type(params[:avatar])
        avatar_data_url = decoded_file(params[:avatar])
        blob = get_blob(avatar_data_url, "#{resource.username}.#{type}", "image/#{type}")
        resource.avatar.attach(blob)
      end
    end

    private

    def render_create_success
      show_success_message("Successfully registered with username '#{@resource.username}'!")
      render 'auth/user', status: :created
    end

    def render_create_error
      if @resource.errors.full_messages.count > 0
        @resource.errors.full_messages.each do |err_msg|
          show_error_message(err_msg)
        end
      else
        show_error_message("Unable to register with username '#{@resource.username}'")
      end

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
