# frozen_string_literal: true

json.extract! landing_email, :id, :email, :created_at, :updated_at
json.url landing_email_url(landing_email, format: :json)
