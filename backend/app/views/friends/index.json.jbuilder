# frozen_string_literal: true

json.data @friends do |friend|
  json.id friend.id
  json.username friend.username
  json.displayName friend.display_name
  json.avatar encoded_file_data_url(friend.avatar) if friend.avatar.attached?
end
