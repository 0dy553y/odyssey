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
      end
      
      namespace :user_tasks do
        get 'tasks_for_day', to: 'tasks_for_day'
      end

      namespace :user_challenges do
        get 'ongoing_user_challenge', to: 'ongoing_user_challenge'
      end
    end
  end
end
