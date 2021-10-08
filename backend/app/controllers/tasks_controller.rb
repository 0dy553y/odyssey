# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :find_challenge
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = @challenge.tasks
  end

  def show
  end

  def create
    @task = @challenge.tasks.build(task_params)
    @task.save!

    render 'tasks/show', status: :created
  end

  def update
    @task.update!(task_params)

    render 'tasks/show', status: :ok
  end

  def destroy
    @task.destroy!

    render 'layouts/empty', status: :no_content
  end

  private

  def find_challenge
    @challenge = Challenge.find(params[:challenge_id])
  end

  def set_task
    @task = @challenge.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:challenge_id, :name, :description, :index)
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    @errors = e

    show_error_message('Task cannot be found')
    render 'layouts/empty', status: :not_found
  end
end
