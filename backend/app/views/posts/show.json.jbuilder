# frozen_string_literal: true

json.data do
  json.partial! 'posts/post', post: @post
end
