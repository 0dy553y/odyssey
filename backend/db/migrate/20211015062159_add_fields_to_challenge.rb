class AddFieldsToChallenge < ActiveRecord::Migration[6.1]
  def change
    add_reference :challenges, :creator, foreign_key: { to_table: :users },  null: false
    add_column :challenges, :color, :integer, null: false
  end
end
