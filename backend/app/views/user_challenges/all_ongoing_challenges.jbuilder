# frozen_string_literal: true

json.data @user_challenges do |user_challenge|
  json.challengeId user_challenge.challenge_id
  json.percentCompleted user_challenge.percent_completed
end
