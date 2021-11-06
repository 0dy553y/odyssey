# frozen_string_literal: true

json.data @challenges do |challenge|
  json.id challenge.id
  json.name challenge.name
  json.duration challenge.duration
  json.categoryId challenge.category_id
  json.userChallengeCount challenge.user_challenges_count
end
