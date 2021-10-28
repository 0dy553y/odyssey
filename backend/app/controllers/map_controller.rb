# frozen_string_literal: true

class MapController < ApplicationController
  def friends_on_same_challenge
    # TODO: this is wrong :|. fix logic.
    friends = current_user.friends
    @user_challenges = current_user.user_challenges.ongoing.map{
        |uc| { 
          challenge_id: uc.challenge_id,
          name: uc.challenge.name,
          num_tasks: uc.user_tasks.size,
          current_task_num: uc.user_tasks.where.not(completed_at: nil).size + 1,
          friends: friends.select { |f| f.user_challenges.ongoing.where(challenge_id: uc.challenge_id) }.map{
              |f| {
                  username: f.username,
                  display_name: f.display_name,
                  current_task: f.user_challenges.ongoing.where(challenge_id: uc.challenge_id).first
                                .user_tasks.where.not(completed_at: nil).size + 1
              }
          }
        }
    }
    p @user_challenges.inspect

    for uc in @user_challenges
        p uc
    end

  end 
end
