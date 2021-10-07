# frozen_string_literal: true

class Challenge < ApplicationRecord
  belongs_to :category
  has_many :tasks, dependent: :destroy
end
