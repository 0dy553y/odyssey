# frozen_string_literal: true

class AddBuildingBlockAndBgAndEnvironmentObjectToMap < ActiveRecord::Migration[6.1]
  def change
    change_table :maps, bulk: true do |t|
      t.integer :building_block, default: 0
      t.integer :background, default: 0
      t.integer :environment_object, default: nil
    end
  end
end
