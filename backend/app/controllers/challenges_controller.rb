# frozen_string_literal: true

class ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params.require(:id))
  end

  def join
    challenge_id = params[:id]
    now = DateTime.now
    ActiveRecord::Base.transaction do
      @user_challenge = UserChallenge.new(
        user_id: current_user.id,
        challenge_id: challenge_id,
        created_at: now,
        updated_at: now
      )
      schedule = Schedule.new(schedule_params)
      @user_challenge.schedule = schedule
      @user_challenge.save!

      create_user_tasks(@user_challenge, schedule, now)
    end

    show_success_message('Successfully enrolled in the challenge!')
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

  def ongoing_and_completed_challenges
    @challenges = current_user.challenges.uniq

    render 'challenges/index', status: :ok
  end

  def get_popular_challenges
    # @challenges = Challenge.find(categoryId: params.require(:category_id), :limit => 10, :order=> 'posts_count desc')
    @challenges = Challenge.where(category_id: params.require(:category_id)).order('user_challenges_count DESC').limit(3)
    render 'challenges/index', status: :ok
  end

  private

  def challenge_params
    params.require(:challenge).permit(:category_id, :name, :description, :schedule, :duration)
  end

  def schedule_params
    params.require(:schedule).permit(:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday)
  end

  def create_user_tasks(user_challenge, schedule, now)
    tasks = Task.where(challenge_id: user_challenge.challenge_id)

    schedule_date_pointer = now
    tasks.each do |task|
      # find next available time in schedule
      schedule_date_pointer += 1.day until schedule[schedule_date_pointer.strftime('%A').downcase]

      user_task = UserTask.new(
        user_id: current_user.id,
        user_challenge_id: user_challenge.id,
        task_id: task.id,
        scheduled_for: schedule_date_pointer
      )
      user_task.save!
      schedule_date_pointer += 1.day
    end
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    @errors = e

    show_error_message('Challenge cannot be found')
    render 'layouts/empty', status: :not_found
  end
end
