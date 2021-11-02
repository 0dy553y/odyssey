# frozen_string_literal: true

class AddPrizeNameToChallenge < ActiveRecord::Migration[6.1]
  def change
    change_table :challenges do |t|
      t.string :prize_name
    end
  end
end
