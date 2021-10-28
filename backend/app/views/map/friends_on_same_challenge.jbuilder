# frozen_string_literal: true

json.data @user_challenges do |user_challenge|
  json.challengeId user_challenge[:challenge_id]
  json.challengeName user_challenge[:name]
  json.numTasks user_challenge[:num_tasks]
  json.currentTaskNum user_challenge[:current_task_num]
  json.friends user_challenge[:friends]
end
