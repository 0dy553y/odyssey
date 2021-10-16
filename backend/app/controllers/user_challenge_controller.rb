# frozen_string_literal: true

class UserChallengeController < ApplicationController
  def latest_user_challenge
    # looks for ongoing attempt
    @user_challenge = current_user.user_challenges.find_by(challenge_id: params.require(:challenge_id),
                                                             completed_at: nil, forfeited_at: nil)

    unless @user_challenge.nil?
      @user_tasks = current_user.user_tasks.includes(:task).where(user_challenge_id: @user_challenge.id)
    end
  end
end
