# frozen_string_literal: true

json.data @user_task_activity_data do |activity_data|
  json.date activity_data[0]
  json.count activity_data[1]
end
