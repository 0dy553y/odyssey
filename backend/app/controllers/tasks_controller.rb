# frozen_string_literal: true

class TasksController < ApplicationController
  def index
    @tasks = Task.all
  end

  def show
    @task = Task.find(params.require(:id))
  end

  def create
    @task = Task.new(task_params)
    @task.save!

    render 'tasks/show', status: :created
  end

  def update
    @task = Task.find(params.require(:id))
    @task.update!(task_params)

    render 'tasks/show', status: :ok
  end

  def destroy
    @task = Task.find(params.require(:id))
    @task.destroy!

    render 'layouts/empty', status: :no_content
  end

  private

  def task_params
    params.require(:task).permit(:challenge_id, :name, :description, :index)
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    @errors = e

    show_error_message('Task cannot be found')
    render 'layouts/empty', status: :not_found
  end
end
