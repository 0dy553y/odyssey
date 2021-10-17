# frozen_string_literal: true

class UserTask < ApplicationRecord
  belongs_to :user
  belongs_to :user_challenge
  belongs_to :task

  scope :completed, -> { where.not(completed_at: nil) }

  def completed?
    completed_at.present?
  end
end
