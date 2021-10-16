# frozen_string_literal: true

json.data do
  json.enrolledDate @user_challenge.created_at
  json.percentCompleted @user_challenge.percent_completed
end
