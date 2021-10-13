# frozen_string_literal: true

json.data @tasks do |task|
  json.id task.id
  json.name task.name
  json.description task.description
  json.index task.index
  json.challengeId task.challenge_id
end
