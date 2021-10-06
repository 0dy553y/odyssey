# frozen_string_literal: true

class CreateChallenges < ActiveRecord::Migration[6.1]
  def change
    create_table :challenges do |t|
      t.references :category, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :schedule
      t.string :duration

      t.timestamps
    end
  end
end
