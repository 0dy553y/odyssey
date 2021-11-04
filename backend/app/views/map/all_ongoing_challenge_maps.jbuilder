# frozen_string_literal: true

json.data @user_challenges do |user_challenge|
  json.username current_user.username
  json.challengeId user_challenge[:challenge_id]
  json.challengeName user_challenge[:name]
  json.prizeName user_challenge[:prize_name]
  json.numTasks user_challenge[:num_tasks]
  json.currentTaskNum user_challenge[:current_task_num]
  json.mapTheme do
    json.partial! 'map/map_theme', map_theme: user_challenge[:map_theme]
  end
  json.friends user_challenge[:friends] do |friend|
    json.username friend[:username]
    json.displayName friend[:display_name]
    json.currentTaskNum friend[:current_task_num]
  end
end
