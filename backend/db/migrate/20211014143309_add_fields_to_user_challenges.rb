class AddFieldsToUserChallenges < ActiveRecord::Migration[6.1]
  def change
    add_column :user_challenges, :completed_at, :datetime
    add_column :user_challenges, :forfeited_at, :datetime
  end
end
