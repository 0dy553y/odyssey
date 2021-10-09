# frozen_string_literal: true

class CreateUserJoinTables < ActiveRecord::Migration[6.1]
  def change
    create_table :user_challenges do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :challenge, index: true, foreign_key: true
      t.datetime :started_at, null: false, default: -> { 'NOW()' }

      t.timestamps
    end

    create_table :user_tasks do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :user_challenge, index: true, foreign_key: true
      t.belongs_to :task, index: true, foreign_key: true
      t.boolean :is_completed, null: false, default: false

      t.timestamps
    end
  end
end
