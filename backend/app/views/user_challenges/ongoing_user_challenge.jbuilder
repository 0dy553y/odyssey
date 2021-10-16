# frozen_string_literal: true

json.data do
  json.enrolledDate @user_challenge&.started_at
  json.percentCompleted @user_challenge&.percent_completed
  json.userTasks @user_tasks do |user_task|
    json.id user_task.id
    json.completedAt user_task.completed_at
    json.taskIndex user_task.task.index
  end
end
