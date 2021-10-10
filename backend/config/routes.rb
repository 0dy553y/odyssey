# frozen_string_literal: true

Rails.application.routes.draw do
  def api_resources(res, &block)
    resources res, except: %i[new edit], &block
  end

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
    sessions: 'auth/sessions',
    token_validations: 'auth/token_validations'
  }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :categories, only: %i[index show]
  api_resources :challenges do
    api_resources :tasks
  end
  get 'tasks_by_day', to: 'user_tasks#tasks_by_day'
end
