Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    otp_verifications: 'users/otp_verifications',
    omniauth_callbacks: 'users/omniauth_callbacks' 
  }
  root 'home#index'
  get 'otp_verifications/new', to: 'users/otp_verifications#new', as: 'new_otp_verification'
  post 'otp_verifications', to: 'users/otp_verifications#create', as: 'otp_verifications'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get '(*path)', to: 'home#index', via: :all



  # Defines the root path route ("/")
  # root "posts#index"
end
