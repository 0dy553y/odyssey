# frozen_string_literal: true

class ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params.require(:id))
  end

  def join
    schedule = schedule_params
    now = DateTime.now
    challengeId = params.require(:challenge_id)
    @userChallenge = UserChallenge.new(
      :user_id => current_user.id,
      :challenge_id => challengeId,
      :created_at => now,
      :updated_at => now,
    )
    @userChallenge.save!

    @tasks = Tasks.find(challenge_id: challengeId)

    schedule_date_pointer = now
    @tasks.each { |task|
      # find next available time in schedule
      while not schedule[schedule_date_pointer.strftime('%A')]:
        schedule_date_pointer += 1
      
      @userTask = UserTask.new(
        :user_id => current_user.id,
        :challenge_id => challengeId,
        :task_id => task.id,
        :scheduled_for => schedule_date_pointer,
      )
      @userTask.save!
      }

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

  def schedule_params
    params.require(:schedule).permit(:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday)
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    @errors = e

    show_error_message('Challenge cannot be found')
    render 'layouts/empty', status: :not_found
  end
end
