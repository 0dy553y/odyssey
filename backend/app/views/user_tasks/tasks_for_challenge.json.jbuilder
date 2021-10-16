# frozen_string_literal: true

json.data @user_tasks do |user_task|
  json.id user_task.id
  json.isCompleted user_task.is_completed
  json.index user_task.task.index
end
