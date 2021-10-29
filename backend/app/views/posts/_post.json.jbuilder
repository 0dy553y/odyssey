# frozen_string_literal: true

json.id post.id
json.body post.body
json.createdAt post.created_at
json.challenge do
  json.id post.challenge_id
  json.categoryId post.challenge.category.id
  json.name post.challenge.name
end
json.creator do
  json.partial! 'users/user', user: post.creator
end
json.reactions post.post_reactions do |reaction|
  json.emoji reaction.emoji
  json.creator do
    json.partial! 'users/user', user: reaction.creator
  end
end
