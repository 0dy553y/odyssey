# frozen_string_literal: true

json.data @friends do |friend|
  json.partial! 'users/user', user: friend
end
