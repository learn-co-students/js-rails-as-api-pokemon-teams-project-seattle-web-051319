const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", ()=>{
    main();
})

function main(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => getAllTrainers(json))
}

function getAllTrainers(object){
    object.forEach(trainer => {
        createTrainer(trainer);
    })
}

function createTrainer(trainer){
    let main = document.getElementById("main-wrapper");

    let card = document.createElement("div");
        card.className = "card"

    let teamList = document.createElement("ul");


    let trainerName = document.createElement("p");
        trainerName.textContent = trainer.name;

    let addPokemonButton = document.createElement("button");
        addPokemonButton.textContent = "Add Pokemon";

        addPokemonButton.addEventListener("click", () => {
            if(teamList.children.length < 6){
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"
                },
                body: JSON.stringify({
                    trainer_id: trainer.id
                })
            })
            .then(resp => resp.json())
            .then(json => {
                trainer.pokemon << json
                appendPokemon(json, teamList)
            })
            }
        })

        listPokemon(trainer, teamList);
        
        card.appendChild(trainerName);
        card.appendChild(addPokemonButton);
        card.appendChild(teamList);

        main.appendChild(card);
}

function listPokemon(trainer, element){
    pokemon = trainer.pokemon;
   
    pokemon.forEach(pokemon => {

        let li = document.createElement("li");
            li.textContent = `${pokemon.nickname}(${pokemon.species})`
        
        let releaseButton = document.createElement("button");
            releaseButton.className = "release";
            releaseButton.textContent = "Release";

            li.appendChild(releaseButton);
        
            element.appendChild(li);

            releaseButton.addEventListener("click", () => {
                fetch(POKEMONS_URL + "/" + pokemon.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accepts": "application/json"
                    }
                })
                .then(resp => resp.json())
                .then(json =>{
                    element.removeChild(li);
                })
            })
    })
}

function appendPokemon(pokemon, element){
    let li = document.createElement("li");
            li.textContent = `${pokemon.nickname}(${pokemon.species})`
        
        let releaseButton = document.createElement("button");
            releaseButton.className = "release";
            releaseButton.textContent = "Release";

            li.appendChild(releaseButton);
        
            element.appendChild(li);
            releaseButton.addEventListener("click", () => {
                fetch(POKEMONS_URL + "/" + pokemon.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accepts": "application/json"
                    }
                })
                .then(resp => resp.json())
                .then(json =>{
                    element.removeChild(li);
                })
            })
}