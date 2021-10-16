# frozen_string_literal: true

class UserTasksController < ApplicationController
  def tasks_for_day
    @user_tasks = current_user.user_tasks.where(scheduled_for: params.require(:date).to_date.all_day)
  end

  def tasks_for_challenge
    # looks for ongoing attempt
    @user_challenge = current_user.user_challenges.find_by(challenge_id: params.require(:challenge_id),
                                                           completed_at: nil, forfeited_at: nil)

    unless @user_challenge.nil?
      @user_tasks = current_user.user_tasks.includes(:task).where(user_challenge_id: @user_challenge.id)
    end
  end
end
