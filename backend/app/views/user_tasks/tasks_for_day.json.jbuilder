# frozen_string_literal: true

json.data @user_tasks do |user_task|
  json.id user_task.id
  json.isCompleted user_task.is_completed
  json.name user_task.task.name
  json.challengeName user_task.task.challenge.name
  json.description user_task.task.description
end
