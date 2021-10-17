# frozen_string_literal: true

json.data @user_tasks do |user_task|
  json.partial! 'user_task', user_task: user_task
end
