# frozen_string_literal: true

class UserChallenge < ApplicationRecord
  belongs_to :user
  belongs_to :challenge
  has_many :user_tasks, dependent: :destroy
  has_one :schedule

  def percent_completed
    user_tasks.where.not(completed_at: nil).count * 1.0 / user_tasks.count * 100
  end
end
