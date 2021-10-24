# frozen_string_literal: true

class AddPostTable < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.belongs_to :creator, index: true, foreign_key: { to_table: :users }, null: false
      t.belongs_to :challenge, index: true, foreign_key: true, null: false

      t.string :body, null: false

      t.timestamps
    end
  end
end
