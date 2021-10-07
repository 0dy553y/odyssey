# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ::ActionView::Layouts
  include StatusMessages
  layout 'application'
end
