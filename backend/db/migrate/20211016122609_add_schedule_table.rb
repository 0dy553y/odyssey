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

      t.references :user_challenge, null: false

      t.timestamps
    end
  end
end
