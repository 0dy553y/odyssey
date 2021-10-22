# frozen_string_literal: true

class PostReaction < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :post, class_name: 'Post'

  validates :emoji, presence: { message: " can't be blank." }

  enum emoji: {
    smiley: 0,
    poop: 1,
    party_popper: 2,
    sparkling_heart: 3,
    crying: 4,
    moon_face: 5,
  }
end
