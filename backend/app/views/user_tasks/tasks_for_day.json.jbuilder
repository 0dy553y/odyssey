# frozen_string_literal: true

json.data @user_tasks do |user_task|
  json.id user_task.id
  json.name user_task.task.name
  json.challengeName user_task.task.challenge.name
  json.description user_task.task.description
  json.isCompleted user_task.completed?
  json.challengeColor user_task.task.challenge.color
end
