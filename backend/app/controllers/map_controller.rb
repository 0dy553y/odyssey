# frozen_string_literal: true

class MapController < ApplicationController
    def friends_on_same_challenge
        @user_challenges = current_user.user_challenges.ongoing
        @friends = current_user.friends
        p @friends.inspect
    end
end
