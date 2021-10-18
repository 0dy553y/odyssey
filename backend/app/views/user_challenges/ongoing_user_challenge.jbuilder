# frozen_string_literal: true

json.data do
  json.challengeId @user_challenge.challenge_id
  json.enrolledDate @user_challenge.started_at
  json.percentCompleted @user_challenge.percent_completed
  json.userTasks @user_tasks do |user_task|
    json.id user_task.id
    json.completedAt user_task.completed_at
    json.taskId user_task.task.id
    json.scheduledFor user_task.scheduled_for
  end
  json.schedule do
    json.monday @user_challenge.schedule.monday
    json.tuesday @user_challenge.schedule.tuesday
    json.wednesday @user_challenge.schedule.wednesday
    json.thursday @user_challenge.schedule.thursday
    json.friday @user_challenge.schedule.friday
    json.saturday @user_challenge.schedule.saturday
    json.sunday @user_challenge.schedule.sunday
  end
end
