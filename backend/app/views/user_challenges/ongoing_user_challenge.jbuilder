# frozen_string_literal: true

json.data do
  json.challengeId user_challenge.challenge_id
  json.enrolledDate @user_challenge.created_at
  json.percentCompleted @user_challenge.percent_completed
  json.userTasks @user_tasks do |user_task|
    json.id user_task.id
    json.completedAt user_task.completed_at
    json.taskIndex user_task.task.index
  end
end
