# frozen_string_literal: true

class Auth::SessionsController < DeviseTokenAuth::SessionsController
  def render_create_success
    render json: {
      data: resource_data(resource_json: @resource.token_validation_response),
      messages: [],
      errors: []
    }
  end

  def render_create_error_bad_credentials
    render json: {
      data: nil,
      messages: [],
      errors: [ I18n.t('devise_token_auth.sessions.bad_credentials') ]
    }, status: :unauthorized
  end
end
