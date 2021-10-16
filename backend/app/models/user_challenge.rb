# frozen_string_literal: true

class UserChallenge < ApplicationRecord
  belongs_to :user
  belongs_to :challenge
  has_many :user_tasks, dependent: :destroy

  def percent_completed
    user_tasks.where(is_completed: true) / user_tasks.count
  end
end
