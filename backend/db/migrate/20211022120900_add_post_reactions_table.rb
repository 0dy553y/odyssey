# frozen_string_literal: true

class AddPostReactionsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :post_reactions do |t|
      t.belongs_to :post, index: true, foreign_key: true, null: false
      t.belongs_to :creator, index: true, foreign_key: { to_table: :users }, null: false

      t.integer :emoji, null: false

      t.timestamps
    end
  end
end
