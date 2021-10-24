# frozen_string_literal: true

class AddIsSystemAccountFlagToUsers < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.boolean :is_system_account, default: false
    end
  end
end
