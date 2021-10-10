# frozen_string_literal: true

class UserTasksController < ApplicationController
  def tasks_by_day
    @user_tasks = current_user.user_tasks.where(scheduled_for: params.require(:date).to_date.all_day)
  end
end
