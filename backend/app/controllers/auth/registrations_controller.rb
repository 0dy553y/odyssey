# frozen_string_literal: true

module Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def render_create_success
    render json: {
      status: 'success',
      payload: { data: resource_data },
      messages: [],
      errors: []
    }
  end

  def render_create_error
    render json: {
      status: 'error',
      payload: { data: resource_data },
      messages: [],
      errors: resource_errors
    }, status: :unprocessable_entity
  end
end
