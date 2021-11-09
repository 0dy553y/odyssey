# frozen_string_literal: true

json.data @user_challenges do |user_challenge|
  json.challengeId user_challenge.challenge_id
  json.percentCompleted user_challenge.percent_completed
  json.challengeName user_challenge.challenge.name
  json.prizeName user_challenge.challenge.prize_name
end
