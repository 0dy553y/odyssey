# frozen_string_literal: true

class UserChallengesController < ApplicationController
  include UserHelper

  def all_user_challenges_for_challenge
    @user_challenges = UserChallenge
                       .where(user_id: current_user.id, challenge_id: params.require(:challenge_id))
                       .includes(:schedule, :user_tasks)
  end

  def all_ongoing_challenges
    @user_challenges = user.user_challenges.ongoing
  end

  def all_completed_challenges
    @user_challenges = user.user_challenges.completed
  end

  def forfeit
    user_challenge = UserChallenge.find(params.require(:id))
    user_challenge.update!(forfeited_at: Time.zone.now)

    show_success_message('Successfully forfeited! See you again another day :-)')
    render 'layouts/empty', status: :ok
  end
end
