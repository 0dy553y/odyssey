# frozen_string_literal: true

class MapController < ApplicationController
    def friends_on_same_challenge
        p current_user
        @user_challenges_id = current_user.user_challenges.ongoing.pluck(:challenge_id)
        p @user_challenges
        @friends = current_user.friends
        .select{ |friend| friend.user_challenges.where(challenge_id: @user_challenges_id) }
        p @friends.inspect
    end
end
