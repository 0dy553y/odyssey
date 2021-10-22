# frozen_string_literal: true

class AddFriendshipsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :friendships do |t|
      t.references :first_user, index: true, foreign_key: { to_table: :users }
      t.references :second_user, index: true, foreign_key: { to_table: :users }

      t.timestamps

      t.index %i[first_user_id second_user_id], unique: true
      t.check_constraint 'first_user_id < second_user_id'
    end
  end
end
