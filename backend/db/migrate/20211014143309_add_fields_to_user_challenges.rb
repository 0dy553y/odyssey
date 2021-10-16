# frozen_string_literal: true

class AddFieldsToUserChallenges < ActiveRecord::Migration[6.1]
  def change
    change_table :user_challenges, bulk: true do |t|
      t.datetime :completed_at
      t.datetime :forfeited_at
    end
  end
end
