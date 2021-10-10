# frozen_string_literal: true

json.data @user_tasks do |user_task|
  json.name user_task.task.name
  json.challengeName user_task.task.challenge.name
  json.description user_task.task.description
  json.isCompleted user_task.is_completed
end
