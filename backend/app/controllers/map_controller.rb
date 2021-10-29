# frozen_string_literal: true

class MapController < ApplicationController
  def friends_on_same_challenges
    friends = current_user.friends
    @user_challenges = current_user.user_challenges.ongoing.map do |uc|
      {
        challenge_id: uc.challenge_id,
        name: uc.challenge.name,
        num_tasks: uc.challenge.tasks.count,
        current_task_num: uc.user_tasks.where.not(completed_at: nil).count + 1,
        friends: friends.select do |f|
                   f.user_challenges.ongoing.where(challenge_id: uc.challenge_id)
                 end.map do |f|
                   {
                     username: f.username,
                     display_name: f.display_name,
                     current_task_num: f.user_challenges.ongoing.where(challenge_id: uc.challenge_id).first
                                        .user_tasks.where.not(completed_at: nil).size + 1
                   }
                 end
      }
    end
  end
end