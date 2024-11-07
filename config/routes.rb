Rails.application.routes.draw do
  get "events/new"
  get "events/create"
  get "events/index"
  get "users/new"
  get "users/create"
  root "home#index"

  # Organize with resources for consistency
  resources :login, only: [ :index ]
  resources :clubs, only: [ :index ]
  resources :dashboard, only: [ :index ]
  resources :profile, only: [ :index ]
  resources :events, only: [:new, :create, :edit, :update, :destroy] #user events

  get "login", to: "login#index", as: "login"
  post "login", to: "login#create"
  delete "logout", to: "login#destroy", as: "logout"

  get "signup", to: "users#new", as: "signup"
  post "signup", to: "users#create"

  get "dashboard", to: "dashboard#index", as: "dashboard"
  get "profile", to: "profile#index", as: "profile"
  get "home", to: "home#index", as: "home"

  get "newEvent", to: "events#new", as: "newEvent"
  post "newEvent", to: "events#create"

  # Routes for AJAX uniqueness checks
  get "users/check_username", to: "users#check_username"
  get "users/check_email", to: "users#check_email"

  # API routes without versioning
  namespace :api do
    resources :events, only: [ :index ]
    resources :news, only: [ :index ]
  end

  # Health check endpoint
  get "up" => "rails/health#show", as: :rails_health_check

  # PWA service worker and manifest
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end
