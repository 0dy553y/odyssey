# frozen_string_literal: true

class UserTasksController < ApplicationController
  def tasks_for_day
    @user_tasks = current_user.user_tasks.where(scheduled_for: params.require(:date).to_date.all_day)
  end

  def mark_as_done
    @user_task = user_tasks.find(params.require(:id))
    @user_task.update!(completed_at: Time.zone.now)
    render 'show', status: :ok
  end

  def mark_as_not_done
    @user_task = user_tasks.find(params.require(:id))
    @user_task.update!(completed_at: nil)
    render 'show', status: :ok
  end
end
