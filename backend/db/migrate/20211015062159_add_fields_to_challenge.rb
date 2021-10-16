# frozen_string_literal: true

class AddFieldsToChallenge < ActiveRecord::Migration[6.1]
  def change
    add_reference :challenges, :creator,
                  foreign_key: { to_table: :users }, null: false,
                  default: 1 # defaults to User with id = 1 (which should be the Odyssey user)
    add_column :challenges, :color, :integer, null: false, default: 0
  end
end
