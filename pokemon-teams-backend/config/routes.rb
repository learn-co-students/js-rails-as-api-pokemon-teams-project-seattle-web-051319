Rails.application.routes.draw do
  get '/trainers' => 'trainers#index'
  get '/pokemon' => 'pokemons#index'
  get '/pokemon/:id' => 'pokemons#show'
  get '/trainers/:id' => 'trainers#show'
  post '/pokemon' => 'pokemons#create'
  delete '/pokemon/:id' => 'pokemons#delete'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
