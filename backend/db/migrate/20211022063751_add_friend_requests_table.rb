# frozen_string_literal: true

class AddFriendRequestsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :friend_requests do |t|
      t.references :sender, index: true, foreign_key: { to_table: :users }
      t.references :receiver, index: true, foreign_key: { to_table: :users }

      t.timestamps

      t.index %i[sender_id receiver_id], unique: true
    end
  end
end
