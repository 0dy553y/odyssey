# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ::ActionView::Layouts
  include StatusMessages
  layout 'application'
  before_action :underscore_params!

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
  end
end
