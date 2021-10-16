class ChangeIsCompletedToCompletedAt < ActiveRecord::Migration[6.1]
  def change
    remove_column :user_tasks, :is_completed
    add_column :user_tasks, :completed_at, :datetime
  end
end
