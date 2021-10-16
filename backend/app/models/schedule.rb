# frozen_string_literal: true

class Schedule < ApplicationRecord
  # has_one at the moment, though it can be changed to has_many if we really want to micro-optimize performance
  has_one :user_challenge, dependent: :restrict_with_exception
end
