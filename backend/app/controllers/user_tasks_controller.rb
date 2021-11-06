# frozen_string_literal: true

class UserTasksController < ApplicationController
  include UserHelper

  def tasks_in_period
    from_date = params.require(:from).to_date
    to_date = params.require(:to).to_date
    date_range = from_date...to_date
    @user_tasks = current_user.user_tasks.joins(:user_challenge)
                              .where(scheduled_for: date_range,
                                     user_challenge: { forfeited_at: nil })
  end

  def mark_as_done
    @user_task = UserTask.find(params.require(:id))
    @user_task.update!(completed_at: Time.zone.now)

    show_success_message('Successfully marked task as done!')
    render 'show', status: :ok
  end

  def mark_as_not_done
    @user_task = UserTask.find(params.require(:id))
    @user_task.update!(completed_at: nil)

    show_success_message('Successfully marked task as not done!')
    render 'show', status: :ok
  end

  def user_task_activity_data
    user_tasks = user.user_tasks.completed

    @user_task_activity_data = user_tasks
                               .group_by { |user_task| user_task.completed_at.beginning_of_day }
                               .transform_values(&:length)
  end
end
