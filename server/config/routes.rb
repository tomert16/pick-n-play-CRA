Rails.application.routes.draw do
  resources :requests
  resources :locations
  resources :player_meet_ups
  resources :meet_ups
  resources :fields
  resources :sports, only: [:index, :show, :create]
  resources :players
  
  ## POST route for signup
  post '/signup', to: 'players#create'
  ## POST route for login 
  post 'login', to: 'sessions#create'
  ## DELETE route for logout
  delete 'logout', to: 'sessions#destroy'
  ## GET route for auto-login
  get '/me', to: 'players#me'
  ## POST route to join a meet up
  post '/join_meet_up', to: 'meet_ups#join_meet_up'
end
