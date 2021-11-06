# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api, defaults: { format: 'json' } do
    scope :v1, defaults: { format: 'json' } do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'auth/registrations',
        sessions: 'auth/sessions',
        token_validations: 'auth/token_validations'
      }

      resources :landing_emails
      def api_resources(res, &block)
        resources res, except: %i[new edit], &block
      end

      # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
      resources :categories, only: %i[index show]
      api_resources :challenges do
        api_resources :tasks
        collection do
          get 'ongoing_and_completed_challenges', to: 'ongoing_and_completed_challenges'
        end
        member do
          post 'join'
        end
      end

      resources :users, only: [] do
        collection do
          get 'user_details', to: 'user_detail'
        end
      end

      resources :user_tasks, only: [] do
        collection do
          get 'tasks_in_period', to: 'tasks_in_period'
          get 'user_task_activity_data', to: 'user_task_activity_data'
        end
        member do
          post 'mark_as_done', to: 'mark_as_done'
          post 'mark_as_not_done', to: 'mark_as_not_done'
        end
      end

      namespace :user_challenges do
        get 'all_ongoing_challenges', to: 'all_ongoing_challenges'
        get 'all_completed_challenges', to: 'all_completed_challenges'
        get 'all_user_challenges_for_challenge', to: 'all_user_challenges_for_challenge'
        patch 'forfeit', to: 'forfeit'
      end

      resources :friends, only: %i[index destroy] do
        collection do
          get 'search', to: 'search'
        end
        member do
          get 'status', to: 'status'
        end
      end
      resources :friend_requests, only: %i[index create update destroy]

      resources :posts, only: %i[index create] do
        collection do
          get 'friend_posts', to: 'friend_posts'
          get 'community_posts', to: 'community_posts'
          get 'posts_for_challenge', to: 'posts_for_challenge'
          get 'posts_for_user', to: 'posts_for_user'
        end
        member do
          post 'add_reaction', to: 'add_reaction'
          post 'remove_reaction', to: 'remove_reaction'
        end
      end

      namespace :map do
        get 'all_ongoing_user_challenge_maps', to: 'all_ongoing_user_challenge_maps'
      end

      # if i put it inside namespace it becomes map/map#show, feel free to move
      # it back in the correct way haha
      get 'map/:id', to: 'map#show'
    end
  end
end
