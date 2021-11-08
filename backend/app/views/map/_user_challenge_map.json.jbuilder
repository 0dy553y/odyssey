# frozen_string_literal: true

json.username current_user.username
json.character current_user.character
json.challengeId challenge_map[:challenge_id]
json.challengeName challenge_map[:name]
json.prizeName challenge_map[:prize_name]
json.numTasks challenge_map[:num_tasks]
json.currentTaskNum challenge_map[:current_task_num]
json.mapTheme do
  json.partial! 'map/map_theme', map_theme: challenge_map[:map_theme], map_color:challenge_map[:map_color]
end
json.friends challenge_map[:friends] do |friend|
  json.username friend[:username]
  json.displayName friend[:display_name]
  json.character friend[:character]
  json.currentTaskNum friend[:current_task_num]
end
