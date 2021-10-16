# frozen_string_literal: true

json.data @user_tasks do |user_task|
  json.id user_task.id
  json.completedAt user_task.completed_at
  json.index user_task.task.index
end
