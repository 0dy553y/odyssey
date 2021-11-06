# frozen_string_literal: true

json.id user.id
json.username user.username
json.displayName user.display_name
json.character user.character
json.avatar encoded_file_data_url(user.avatar) if user.avatar.attached?
json.registrationDate user.created_at
