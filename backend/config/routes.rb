# frozen_string_literal: true

Rails.application.routes.draw do
  def api_resources(res, &block)
    resources res, except: %i[new edit], &block
  end

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
    sessions: 'auth/sessions'
  }

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :categories, only: %i[index show]
  api_resources :challenges do
    api_resources :tasks
  end
end
