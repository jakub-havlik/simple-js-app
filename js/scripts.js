
//wrap pokemonList array in an IIFE to avoid accidentally accessing the global state

//new pokemonRepository variable to hold what the IIFE will return
//assign the IIFE to that variable

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      !Array.isArray(pokemon) &&
      pokemon !== null
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct');
    }
  }
  //alternative way
  /*function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }*/

  function getAll() {
    return pokemonList;
  }

  //adding list item and button to the html
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    //on-click event
    button.addEventListener('click', function(event) {
      showDetails(pokemon)
    });
  }

  //fetching data from the API and converting them to JSON
  //returning objects (pokemon) from JSON
  //pushing objects (pokemon) to the array pokemonList
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //load details for each item
  //each pokemon on the API has its own URL with details
  //load details from this URL
  //same process as in the previous function (loadList())
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //logging details of the item to the console
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  //IIFE returns an object with public functions assigned as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

}) ();


pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
