# frozen_string_literal: true

json.data @user_tasks do |user_task|
  json.id user_task.id
  json.name user_task.task.name
end
