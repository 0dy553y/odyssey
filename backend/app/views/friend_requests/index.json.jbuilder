# frozen_string_literal: true

json.data @friend_requests do |friend_request|
  json.id friend_request.id
  json.sentAt friend_request.created_at
  sender = friend_request.sender
  json.sender do
    json.id sender.id
    json.username sender.username
    json.displayName sender.display_name
    json.avatar encoded_file_data_url(sender.avatar) if sender.avatar.attached?
  end
end
