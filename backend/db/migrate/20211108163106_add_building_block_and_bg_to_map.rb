# frozen_string_literal: true

class AddBuildingBlockAndBgToMap < ActiveRecord::Migration[6.1]
  def change
    change_table :maps do |t|
      t.integer :building_block, default: 0
      t.integer :background, default: 0
    end
  end
end
