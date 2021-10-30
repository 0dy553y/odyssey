class AddOriginalCreatorAndReferenceLinkToChallenges < ActiveRecord::Migration[6.1]
  def change
    add_column :challenges, :original_creator, :string, default: ''
    add_column :challenges, :link_to_reference, :string, default: ''
  end
end
