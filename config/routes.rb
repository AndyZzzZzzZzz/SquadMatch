Rails.application.routes.draw do
  root "home#index"
  
  # Organize with resources for consistency
  resources :login, only: [:index]
  resources :clubs, only: [:index]
  resources :dashboard, only: [:index]
  resources :profile, only: [:index]

  # API routes without versioning
  namespace :api do
    resources :events, only: [:index]
    resources :news, only: [:index]
  end  

  # Health check endpoint
  get "up" => "rails/health#show", as: :rails_health_check

  # PWA service worker and manifest
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end
