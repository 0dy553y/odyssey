# frozen_string_literal: true

class UserChallengesController < ApplicationController
  def ongoing_user_challenge
    # looks for ongoing attempt
    @user_challenge = current_user.user_challenges.find_by(challenge_id: params.require(:challenge_id),
                                                           completed_at: nil, forfeited_at: nil)

    return if @user_challenge.nil?

    @user_tasks = current_user.user_tasks.includes(:task).where(user_challenge_id: @user_challenge.id)
  end

  def all_ongoing_challenges
    @user_challenge = current_user.user_challenges.find_by(completed_at: nil, forfeited_at: nil)
  end
end
