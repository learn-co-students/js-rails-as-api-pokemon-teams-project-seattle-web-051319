class PokemonsController < ApplicationController
  require 'faker'

  def index
    pokemons = Pokemon.all
    render json: pokemons, include: [:trainer]
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: pokemon
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, include: [:trainer]
  end

  def delete
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
    render json: pokemon
  end
end
