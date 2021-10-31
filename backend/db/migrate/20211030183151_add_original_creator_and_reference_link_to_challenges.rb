# frozen_string_literal: true

class AddOriginalCreatorAndReferenceLinkToChallenges < ActiveRecord::Migration[6.1]
  def change
    change_table :user_challenges, bulk: true do |t|
      t.string :original_creator
      t.string :link_to_reference
    end
  end
end
