# frozen_string_literal: true

json.data @user_challenges do |user_challenge|
  json.challengeId user_challenge.challenge_id
  json.completedAt user_challenge.completed_at
end