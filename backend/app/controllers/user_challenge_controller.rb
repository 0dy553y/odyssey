# frozen_string_literal: true

class UserChallengeController < ApplicationController
  def user_challenge_stats
    @user_challenge = current_user.user_challenges.find_by(challenge_id: params.require(:challenge_id),
                                                             completed_at: nil, forfeited_at: nil)
  end
end
