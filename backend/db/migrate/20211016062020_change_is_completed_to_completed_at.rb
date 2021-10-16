# frozen_string_literal: true

class ChangeIsCompletedToCompletedAt < ActiveRecord::Migration[6.1]
  def up
    change_table :user_tasks, bulk: true do |t|
      t.datetime :completed_at
      t.remove(:is_completed)
    end
  end

  def down
    change_table :user_tasks, bulk: true do |t|
      t.boolean :is_completed
      t.remove(:completed_at)
    end
  end
end
