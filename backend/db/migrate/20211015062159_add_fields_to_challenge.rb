class AddFieldsToChallenge < ActiveRecord::Migration[6.1]
  def change
    add_column :challenges, :created_by, :string, null: false
    add_column :challenges, :color, :integer, null: false
  end
end
