# frozen_string_literal: true

class UserTasksController < ApplicationController
  def tasks_for_day
    # date refers to the very beginning of the 24 hour period in which to search for scheduled tasks.
    date = params.require(:date).to_date
    date_range = date..(date + 1.day)
    @user_tasks = current_user.user_tasks.where(scheduled_for: date_range)
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
    user_tasks = current_user.user_tasks.completed

    @user_task_activity_data = user_tasks
                               .group_by { |user_task| user_task.completed_at.beginning_of_day }
                               .transform_values(&:length)
  end
end
