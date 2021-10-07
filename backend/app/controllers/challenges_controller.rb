# frozen_string_literal: true

class ChallengesController < ApplicationController
  def index
    @challenges = Challenge.all
  end

  def show
    @challenge = Challenge.find(params.require(:id))
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

    render status: :no_content
  end

  private

  def challenge_params
    params.require(:data).permit(:name, :description, :schedule, :duration)
  end
end
