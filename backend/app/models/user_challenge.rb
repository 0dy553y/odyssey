# frozen_string_literal: true

class UserChallenge < ApplicationRecord
  belongs_to :user
  belongs_to :challenge
  has_many :user_tasks, dependent: :destroy
end
