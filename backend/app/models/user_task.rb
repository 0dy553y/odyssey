# frozen_string_literal: true

class UserTask < ApplicationRecord
  belongs_to :user
  belongs_to :user_challenge
  belongs_to :task

  def is_completed
    completed_at.present?
  end
end
