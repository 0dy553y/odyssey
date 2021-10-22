# frozen_string_literal: true

json.data @posts do |post|
  json.id post.id
  json.body post.body
  json.creator do
    json.partial! 'users/user', user: post.creator
  end
  json.reactions post.post_reactions do |reaction|
    json.emoji reaction.emoji
    json.creator do
      json.partial! 'users/user', user: reaction.creator
    end
  end
end
