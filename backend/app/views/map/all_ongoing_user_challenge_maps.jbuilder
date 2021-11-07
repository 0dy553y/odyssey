# frozen_string_literal: true

json.data @ongoing_user_challenges_maps do |ongoing_user_challenge_map|
  json.partial! 'map/user_challenge_map', challenge_map: ongoing_user_challenge_map
end
