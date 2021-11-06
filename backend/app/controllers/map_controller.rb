# frozen_string_literal: true

class MapController < ApplicationController
  def all_ongoing_user_challenge_maps
    @ongoing_user_challenges_maps = current_user.user_challenges.ongoing.map do |ongoing_user_challenge|
      construct_user_challenge_map_data(ongoing_user_challenge)
    end
  end

  def show
    @user_challenge_map = construct_user_challenge_map_data(current_user.user_challenges.find_by(challenge_id: params[:id]))
  end

  private

  def construct_user_challenge_map_data(user_challenge)
    {
      challenge_id: user_challenge.challenge_id,
      name: user_challenge.challenge.name,
      prize_name: user_challenge.challenge.prize_name,
      map_theme: user_challenge.challenge.map,
      num_tasks: user_challenge.challenge.tasks.count,
      current_task_num: user_challenge.user_tasks.where.not(completed_at: nil).count + 1,
      friends: current_user.friends.select do |f|
                 f.user_challenges.ongoing.where(challenge_id: user_challenge.challenge_id).first
               end.map do |f|
                 {
                   username: f.username,
                   display_name: f.display_name,
                   character: f.character,
                   current_task_num: f.user_challenges.ongoing.where(challenge_id: user_challenge.challenge_id).first
                                      .user_tasks.where.not(completed_at: nil).size + 1
                 }
               end
    }
  end
end
