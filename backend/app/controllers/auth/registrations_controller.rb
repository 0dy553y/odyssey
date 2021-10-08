# frozen_string_literal: true

class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  include StatusMessages

  def render_create_success
    render json: {
      status: 'success',
      data: resource_data,
      messages: [],
      errors: []
    }
  end

  def render_create_error
    render json: {
      status: 'error',
      data: resource_data,
      messages: [],
      errors: resource_errors
    }, status: :unprocessable_entity
  end
end
