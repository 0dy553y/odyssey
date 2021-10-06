# frozen_string_literal: true

Rails.application.routes.draw do
  resources :challenges
  resources :categories
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
