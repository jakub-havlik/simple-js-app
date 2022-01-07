
//wrap pokemonList array in an IIFE to avoid accidentally accessing the global state

//new pokemonRepository variable to hold what the IIFE will return
//assign the IIFE to that variable

let pokemonRepository = (function () {

  let pokemonList = [
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
  ]


  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'types' in pokemon &&
      'height' in pokemon &&
      'pokedexNumber' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct')
    }
  }

  //IIFE returns an object with public functions assigned as keys
  return {
    getAll: getAll,
    add: add
  }

}) ()

//console.log(pokemonRepository.getAll);
//console.log(pokemonRepository.add);


//add a new pokemon to the pokemonList
let newPokemon = {
    name: 'Weedle',
    types: ['bug', 'poison'],
    height: 1,
    pokedexNumber: '#13'
};

pokemonRepository.add(newPokemon);


//define function writing the list of pokemons
function pokemonWrite(pokemon) {
  let _html = `<br>${pokemon.name} (height: ${pokemon.height}) ${
    pokemon.height < 1.7 && pokemon.height > 0.5
      ? "- this pokemon is kind of average..."
      : pokemon.height <= 0.5
      ? "- this pokemon is really tiny!"
      : "- this pokemon is bigger than I thought!"
  }`;
  document.write(_html);
}
//retrieve pokemonList from the IIFE
let retrievePokemonList = pokemonRepository.getAll();
//iterate over each pokemon in the repository using forEach() loop
retrievePokemonList.forEach(pokemonWrite);
