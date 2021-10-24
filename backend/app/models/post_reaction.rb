# frozen_string_literal: true

class PostReaction < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :post, class_name: 'Post'

  validates :emoji, presence: { message: "can't be blank." }
  validates :emoji, uniqueness: { scope: %i[creator_id post_id],
                                  message: 'can only have the same reaction once for a post' }
end
