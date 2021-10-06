# frozen_string_literal: true

json.extract! challenge, :id, :category_id, :name, :description, :schedule, :duration, :created_at, :updated_at
json.url challenge_url(challenge, format: :json)
