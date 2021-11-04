# frozen_string_literal: true

class Map < ApplicationRecord
  belongs_to :challenge, class_name: 'Challenge'
end
