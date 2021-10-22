# frozen_string_literal: true

json.data @friends do |friend|
  json.partial! 'user', user: friend
end
