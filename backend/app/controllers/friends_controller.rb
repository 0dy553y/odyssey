# frozen_string_literal: true

class FriendsController < ApplicationController
  def index
    @friends = current_user.friends
  end
end
