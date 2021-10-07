# frozen_string_literal: true

module StatusMessages
  extend ActiveSupport::Concern

  # StatusMessageType
  #   Error: 0,
  #   Warning: 1,
  #   Information: 2,
  #   Success: 3

  included do
    prepend_before_action :setup_variables
  end

  def show_error_message(content)
    @messages << { content: content, type: 0 }
  end

  def show_warning_message(content)
    @messages << { content: content, type: 1 }
  end

  def show_information_message(content)
    @messages << { content: content, type: 2 }
  end

  def show_success_message(content)
    @messages << { content: content, type: 3 }
  end

  private

  def setup_variables
    @messages = []
    @errors = {}
  end
end
