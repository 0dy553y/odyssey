# frozen_string_literal: true

class UserTask < ApplicationRecord
  belongs_to :user
  belongs_to :user_challenge
  belongs_to :task

  before_save do
    self.scheduled_for = scheduled_for.beginning_of_day
  end

  after_update do
    user_challenge.set_completion_status
  end

  scope :completed, -> { where.not(completed_at: nil) }

  def completed?
    completed_at.present?
  end
end
