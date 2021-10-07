# frozen_string_literal: true

json.data @categories do |category|
  json.id category.id
  json.title category.title
end
  