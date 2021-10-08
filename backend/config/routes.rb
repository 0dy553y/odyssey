# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: "auth/registrations",
    sessions: "auth/sessions"
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :categories, only: %i[index show]
  resources :challenges, only: %i[index show create update destroy] do
    resources :tasks, only: %i[index show create update destroy]
  end
end
