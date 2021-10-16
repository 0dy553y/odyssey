# frozen_string_literal: true

class AddScheduleTable < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules do |t|
      t.boolean :monday, default: false
      t.boolean :tuesday, default: false
      t.boolean :wednesday, default: false
      t.boolean :thursday, default: false
      t.boolean :friday, default: false
      t.boolean :saturday, default: false
      t.boolean :sunday, default: false

      t.timestamps
    end

    add_reference :user_challenges, :schedule,
                  foreign_key: { to_table: :schedules }, null: false
  end
end
