# frozen_string_literal: true

json.id user_task.id
json.name user_task.task.name
json.challengeName user_task.task.challenge.name
json.description user_task.task.description
json.isCompleted user_task.completed?
