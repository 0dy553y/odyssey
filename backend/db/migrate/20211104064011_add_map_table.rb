class AddMapTable < ActiveRecord::Migration[6.1]
  def change
    create_table :maps do |t|
      t.integer :land, default: 0

      t.timestamps
    end

    add_reference :challenges, :maps,
                  foreign_key: { to_table: :maps } # rubocop:disable Rails/NotNullColumn
  end
end
