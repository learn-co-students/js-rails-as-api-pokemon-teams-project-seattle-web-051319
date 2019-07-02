const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemon`

function main() {
  const pokemonHolder = document.querySelector('main')
  fetchTrainerInfo(pokemonHolder)
}

function fetchTrainerInfo(htmlElement) {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => {
    for (let trainer of json) {
      addTrainerToPage(trainer, htmlElement)
    }
  })
}

function addTrainerToPage(trainerObject, htmlElement) {
  const pokemons = trainerObject.pokemon
  const div = document.createElement('div')
  const p = document.createElement('p')
  const button = document.createElement('button')
  const ul = document.createElement('ul')

  div.className = 'card'
  div.setAttribute('data-id', trainerObject.id)
  p.textContent = trainerObject.name
  button.setAttribute('data-trainer-id', trainerObject.id)
  button.textContent = 'Add Pokemon'

  button.addEventListener('click', () => {
    addRandomPokemon(button, ul)
  })

  addPokemonToTrainer(pokemons, ul)

  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(ul)

  htmlElement.appendChild(div)
}

function addPokemonToTrainer(pokemonCollection, htmlElement) {
  const li1 = document.createElement('li')
  const button2 = document.createElement('button')
  const li2 = document.createElement('li')
  const button3 = document.createElement('button')
  const li3 = document.createElement('li')
  const button4 = document.createElement('button')
  const li4 = document.createElement('li')
  const button5 = document.createElement('button')
  const li5 = document.createElement('li')
  const button6 = document.createElement('button')
  const li6 = document.createElement('li')
  const button7 = document.createElement('button')

  for (let pokemon of pokemonCollection) {
    const li = document.createElement('li')
    const button = document.createElement('button')
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    button.className = 'release'
    button.setAttribute('data-pokemon-id', pokemon.id)
    button.textContent = 'Release'
    li.appendChild(button)
    htmlElement.appendChild(li)

    button.addEventListener('click', () => {
      removePokemonFromTrainer(pokemon, li)
    })
  }
}

function addRandomPokemon(htmlElement1, htmlElement2) {
  if (htmlElement2.children.length < 6) {
    const trainerId = htmlElement1.getAttribute('data-trainer-id')
    fetch(`${POKEMONS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        trainer_id: trainerId
      })
    })
    .then(res => res.json())
    .then(json => {
      let arr = []
      arr.push(json)
      addPokemonToTrainer(arr, htmlElement2)
    })
  }
}

function removePokemonFromTrainer(pokemon, htmlElement) {
  fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    htmlElement.parentNode.removeChild(htmlElement)
  })
  .catch(error => console.log(error))
}

main()
