# frozen_string_literal: true

Rails.application.routes.draw do
  def api_resources(res, &block)
    resources res, except: %i[new edit], &block
  end

  scope :api, defaults: { format: 'json' } do
    scope :v1, defaults: { format: 'json' } do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'auth/registrations',
        sessions: 'auth/sessions',
        token_validations: 'auth/token_validations'
      }

      # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      resources :categories, only: %i[index show]
      api_resources :challenges do
        api_resources :tasks
        member do
          post 'join'
        end
      end

      resources :user_tasks, only: [] do
        collection do
          get 'tasks_for_day', to: 'tasks_for_day'
          get 'user_task_activity_data', to: 'user_task_activity_data'
        end
        member do
          post 'mark_as_done', to: 'mark_as_done'
          post 'mark_as_not_done', to: 'mark_as_not_done'
        end
      end

      namespace :user_challenges do
        get 'ongoing_user_challenge', to: 'ongoing_user_challenge'
        get 'all_ongoing_challenges', to: 'all_ongoing_challenges'
        get 'all_completed_challenges', to: 'all_completed_challenges'
      end

      resources :friends, only: %i[index destroy]
      resources :friend_requests, only: %i[index create destroy]
    end
  end
end
