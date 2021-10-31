# frozen_string_literal: true

json.data do
  json.id @challenge.id
  json.name @challenge.name
  json.description @challenge.description
  json.schedule @challenge.schedule
  json.color @challenge.color
  json.createdBy @challenge.creator.display_name || @challenge.creator.username
  json.duration @challenge.duration
  json.categoryId @challenge.category_id
  json.originalCreator @challenge.original_creator.presence
  json.referenceLink @challenge.link_to_reference.presence
end
