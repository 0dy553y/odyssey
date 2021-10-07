# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ::ActionView::Layouts
  include StatusMessages
  layout 'application'
  before_action :underscore_params!
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end

  rescue_from ActiveRecord::StatementInvalid, ActionController::ParameterMissing do |e|
    @errors = e

    show_error_message('Request contains invalid or malformed parameters')
    render 'layouts/empty', status: :bad_request
  end

  rescue_from ActiveRecord::RecordInvalid, ArgumentError do |e|
    @errors = e

    show_error_message(@errors)
    render 'layouts/empty', status: :unprocessable_entity


  protected

  def configure_permitted_parameters
    added_attrs = [:username, :email, :display_name, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :sign_in, keys: [:login, :password]
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

  def provider
    super
    'username'
  end
end
