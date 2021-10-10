# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :challenge
  has_many :user_tasks, dependent: :destroy
  has_many :users, through: :user_tasks

  default_scope -> { order(index: :asc) }
  validates :name,
            presence: { message: " can't be blank." },
            length: { minimum: 1, maximum: 40,
                      message: ' must be between 1 and 40 characters.' }
end
