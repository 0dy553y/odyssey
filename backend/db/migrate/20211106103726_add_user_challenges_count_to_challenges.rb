# frozen_string_literal: true

class AddUserChallengesCountToChallenges < ActiveRecord::Migration[6.1]
  def change
    add_column :challenges, :user_challenges_count, :integer, default: 0, null: false
  end
end
