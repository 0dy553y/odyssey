# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :challenge, class_name: 'Challenge'

  has_many :post_reactions, dependent: :destroy

  validates :body, presence: { message: "can't be blank." }

  default_scope -> { order(created_at: :desc) }
end
