# frozen_string_literal: true

class Challenge < ApplicationRecord
  belongs_to :category
  has_many :tasks, dependent: :destroy
  has_many :user_challenges, dependent: :destroy
  has_many :users, through: :user_challenges

  default_scope -> { order(name: :asc) }
  validates :name,
            presence: { message: " can't be blank." },
            length: { minimum: 1, maximum: 25,
                      message: ' must be between 1 and 25 characters.' }
end
