# frozen_string_literal: true

class ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params.require(:id))
  end

  def join
    schedule = params[:schedule]
    challenge_id = params[:id]
    my_id = current_user.id
    now = DateTime.now
    ActiveRecord::Base.transaction do
      @user_challenge = UserChallenge.new(
        user_id: my_id,
        challenge_id: challenge_id,
        created_at: now,
        updated_at: now
      )
      @user_challenge.save!

      @tasks = Task.where(challenge_id: challenge_id)

      schedule_date_pointer = now
      @tasks.each do |task|
        # find next available time in schedule
        schedule_date_pointer += 1.day until schedule[schedule_date_pointer.wday - 1]
        
        @user_task = UserTask.new(
          user_id: my_id,
          user_challenge_id: @user_challenge.id,
          task_id: task.id,
          scheduled_for: schedule_date_pointer
        )
        @user_task.save!
        schedule_date_pointer += 1.day
      end
    end

    render 'layouts/empty', status: :ok
  end

  def create
    @challenge = Challenge.new(challenge_params)
    @challenge.save!

    render 'challenges/show', status: :created
  end

  def update
    @challenge = Challenge.find(params.require(:id))
    @challenge.update!(challenge_params)

    render 'challenges/show', status: :ok
  end

  def destroy
    @challenge = Challenge.find(params.require(:id))
    @challenge.destroy!

    render 'layouts/empty', status: :no_content
  end

  private

  def challenge_params
    params.require(:challenge).permit(:category_id, :name, :description, :schedule, :duration)
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    @errors = e

    show_error_message('Challenge cannot be found')
    render 'layouts/empty', status: :not_found
  end
end
