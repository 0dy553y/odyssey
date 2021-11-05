# frozen_string_literal: true

class AddCharacterToUser < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.integer :character, default: 0
    end
  end
end
