# frozen_string_literal: true

class CreateLandingEmails < ActiveRecord::Migration[6.1]
  def change
    create_table :landing_emails do |t|
      t.string :email

      t.timestamps
    end
  end
end
