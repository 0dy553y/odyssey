# frozen_string_literal: true

class UserChallengesController < ApplicationController
  def all_user_challenges_for_challenge
    @user_challenges = UserChallenge
                         .where(user_id: current_user.id, challenge_id: params.require(:challenge_id))
                         .includes(:schedule, :user_tasks)
  end

  def all_ongoing_challenges
    @user_challenges = current_user.user_challenges.ongoing
  end

  def all_completed_challenges
    @user_challenges = current_user.user_challenges.completed
  end
end
