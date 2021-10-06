class Category < ApplicationRecord
    has_many :challenges, dependent: :destroy
end
