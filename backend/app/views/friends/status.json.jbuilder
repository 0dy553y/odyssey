# frozen_string_literal: true

json.data do
  json.friendStatus @friend_status
  json.friendRequestId @friend_request.id if @friend_request.present?
end
