# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ::ActionView::Layouts
  include StatusMessages
  layout 'application'

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
