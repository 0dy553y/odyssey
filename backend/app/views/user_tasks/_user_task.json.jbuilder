# frozen_string_literal: true

json.id user_task.id
json.name user_task.task.name
json.challengeName user_task.task.challenge.name
json.scheduledFor user_task.scheduled_for.beginning_of_day
json.description user_task.task.description
json.completedAt user_task.completed_at
json.challengeColor user_task.task.challenge.color
json.challengeId user_task.task.challenge.id
