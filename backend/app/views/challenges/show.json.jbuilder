# frozen_string_literal: true

json.data do
  json.id @challenge.id
  json.name @challenge.name
  json.description @challenge.description
  json.schedule @challenge.schedule
  json.duration @challenge.duration
end
