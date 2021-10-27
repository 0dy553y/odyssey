# frozen_string_literal: true

json.data @friends do |friend|
  json.friendId friend.id
  json.friendDisplayName friend.display_name
  json.friendUsername friend.username
end
