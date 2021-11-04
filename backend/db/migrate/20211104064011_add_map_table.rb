# frozen_string_literal: true

class AddMapTable < ActiveRecord::Migration[6.1]
  def change
    create_table :maps do |t|
      t.belongs_to :challenge, index: true, foreign_key: true, null: false

      t.integer :land, default: 0

      t.timestamps
    end
  end
end
