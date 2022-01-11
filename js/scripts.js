
//wrap pokemonList array in an IIFE to avoid accidentally accessing the global state

//new pokemonRepository variable to hold what the IIFE will return
//assign the IIFE to that variable

let pokemonRepository = (function () {

  let repository = [
      {
          name: 'Venusaur',
          types: ['grass', 'poison'],
          height: 2,
          pokedexNumber: '#3'
      },
      {
          name: 'Gengar',
          types: ['ghost', 'poison'],
          height: 1.5,
          pokedexNumber: '#94'
      },
      {
          name: 'Blastoise',
          types: 'water',
          height: 1.6,
          pokedexNumber: '#9'
      },
      {
          name: 'Kakuna',
          types: ['bug', 'poison'],
          height: 0.6,
          pokedexNumber: '#14'
      },
      {
          name: 'Golbat',
          types: ['poison', 'flying'],
          height: 1.6,
          pokedexNumber: '#42'
      },
      {
          name: 'Togepi',
          types: 'fairy',
          height: 0.3,
          pokedexNumber: '#175'
      }
  ];

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      !Array.isArray(pokemon) &&
      pokemon !== null
    ) {
      repository.push(pokemon);
    } else {
      console.log('Pokemon is not correct');
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    //on-click event
    button.addEventListener('click', function() {
      showDetails(pokemon)
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  //IIFE returns an object with public functions assigned as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

}) ()


//add a new pokemon to the pokemonList
let newPokemon = {
    name: 'Weedle',
    types: ['bug', 'poison'],
    height: 1,
    pokedexNumber: '#13'
};

pokemonRepository.add(newPokemon);

//console.log(pokemonRepository.getAll);

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
