# frozen_string_literal: true

class Friendship < ApplicationRecord
  belongs_to :first_user, class_name: 'User'
  belongs_to :second_user, class_name: 'User'
  validates :first_user_id, numericality: { less_than: :second_user_id,
                                            message: 'must have a smaller ID than second user' }
end
