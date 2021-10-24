# frozen_string_literal: true

json.data @posts do |post|
  json.partial! 'posts/post', post: post
end
