# frozen_string_literal: true

class UserChallengesController < ApplicationController
  def ongoing_user_challenge
    # looks for ongoing attempt
    @user_challenge = current_user.user_challenges.includes(:schedule)
                                  .ongoing
                                  .find_by(challenge_id: params.require(:challenge_id))

    return render 'layouts/empty', status: :ok if @user_challenge.nil?

    @user_tasks = current_user.user_tasks.includes(:task).where(user_challenge_id: @user_challenge.id)
  end

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
