# frozen_string_literal: true

class UpdateUserChallengeCountValues < ActiveRecord::Migration[6.1]
  def change
    Challenge.find_each { |challenge| Challenge.reset_counters(challenge.id, :user_challenges_count) }
  end
end
