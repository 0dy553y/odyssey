# frozen_string_literal: true

json.id user.id
json.username user.username
json.displayName user.display_name
json.avatar encoded_file_data_url(user.avatar) if user.avatar.attached?
