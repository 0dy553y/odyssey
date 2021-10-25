# frozen_string_literal: true

json.data @user_challenges do |user_challenge|
  json.challengeId user_challenge.challenge_id
  json.enrolledDate user_challenge.started_at
  json.percentCompleted user_challenge.percent_completed
  json.userTasks user_challenge.user_tasks do |user_task|
    json.id user_task.id
    json.completedAt user_task.completed_at
    json.taskId user_task.task.id
    json.taskIndex user_task.task.index
    json.scheduledFor user_task.scheduled_for
  end
  json.schedule do
    json.partial! 'schedules/schedule', schedule: user_challenge.schedule
  end
end
