# frozen_string_literal: true

class UserTasksController < ApplicationController
  def tasks_for_day
    @user_tasks = current_user.user_tasks.where(scheduled_for: params.require(:date).to_date.all_day)
  end

  def tasks_for_challenge
    # looks for ongoing attempt
    @user_challenge = current_user.user_challenges.find_by(challenge_id: params.require(:challenge_id), completed_at: nil, forfeited_at: nil)
    if @user_challenge != nil
      p @user_challenge.id
      @user_tasks = current_user.user_tasks.where(user_challenge_id: @user_challenge.id)
    end
    p @user_tasks.inspect
    render 'user_tasks/tasks_for_day', status: :ok
  end
end
