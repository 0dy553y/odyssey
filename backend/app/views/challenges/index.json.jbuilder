# frozen_string_literal: true

json.data @challenges do |challenge|
  # json.category.id category_id
  json.id challenge.id
  json.name challenge.name
  json.duration challenge.duration
end
