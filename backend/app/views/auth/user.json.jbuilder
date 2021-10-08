# frozen_string_literal: true

json.key_format! camelize: :lower

# The Devise controllers make use of @resource to store the user information.
json.data do
  json.id @resource.id
  json.username @resource.username
  json.displayName @resource.display_name
end
