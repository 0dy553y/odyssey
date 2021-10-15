# frozen_string_literal: true

json.data do
  json.id @challenge.id
  json.name @challenge.name
  json.description @challenge.description
  json.schedule @challenge.schedule
  json.color @challenge.color
  json.createdBy @challenge.created_by
end
