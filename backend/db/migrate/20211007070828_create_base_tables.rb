# frozen_string_literal: true

class CreateBaseTables < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.string :title, null: false

      t.timestamps
    end

    create_table :challenges do |t|
      t.belongs_to :category, index: true, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.string :schedule
      t.integer :duration, null: false

      t.timestamps
    end

    create_table :tasks do |t|
      t.belongs_to :challenge, index: true, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.integer :index, null: false

      t.index %i[challenge_id index], unique: true
      t.timestamps
    end
  end
end
