# frozen_string_literal: true

json.data do
  json.friendStatus @friend_status
  json.friendRequestId @friend_request_id if @friend_request_id.present?
end
