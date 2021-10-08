# frozen_string_literal: true

module Auth
  class SessionsController < DeviseTokenAuth::SessionsController
    def render_create_success
      render json: {
        payload: { data: resource_data(resource_json: @resource.token_validation_response) },
        messages: [],
        errors: []
      }
    end

    def render_create_error_bad_credentials
      render json: {
        payload: { data: nil },
        messages: [],
        errors: [I18n.t('devise_token_auth.sessions.bad_credentials')]
      }, status: :unauthorized
    end
  end
end
