# frozen_string_literal: true

class UserChallenge < ApplicationRecord
  belongs_to :user
  belongs_to :challenge
  has_many :user_tasks, dependent: :destroy
  belongs_to :schedule

  def percent_completed
    user_tasks.completed.count * 1.0 / user_tasks.count * 100
  end

  def completed?
    completed_at.present?
  end

  def set_completion_status
    is_challenge_completed = user_tasks.completed.count == user_tasks.count

    if is_challenge_completed
      update(completed_at: Time.zone.now)
    else
      update(completed_at: nil)
    end
  end
end
