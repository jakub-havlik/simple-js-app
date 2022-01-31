
//wrap pokemonList array in an IIFE to avoid accidentally accessing the global state
//new pokemonRepository variable to hold what the IIFE will return
//assign the IIFE to that variable

//__beginning of IIFE
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // 1 ADDING POKEMON TO THE LIST
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

  // 2 DECLARE GET ALL FUNCTION
  function getAll() {
    return pokemonList;
  }

  // 3 CREATE BUTTONS
  //creates list of buttons as a child of a div, with CSS styles, and with an Event Listener
  function addList(pokemon) {
    loadDetails(pokemon).then(function () {
      let container = $('.pokemon-app');
      let listPokemon = $('<li></li>');

      let pokemonImageFront = $('<img alt="Image of Pokemon" src="' + pokemon.imageUrlFront + '">');
      pokemonImageFront.addClass('img-fluid');

      let pokemonName = pokemon.name.toUpperCase();

      let button = $('<button></button>');
      button.addClass('btn button')

      button.append(pokemonName);
      button.append(pokemonImageFront);
      listPokemon.append(button);
      container.append(listPokemon);

      button.on('click', function() {
        showDetails(pokemon);
        showModal(pokemon);
      });
    });
  }

  // 4 FETCH DATA FROM API
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
        }
        add(pokemon);
        // console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // 5 LOAD DETAILS
  //load details for each pokemon
  //each pokemon on the API has its own URL with details
  //load details from this URL
  //same process as in the previous function (loadList())
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the pokemon
      // flatten the array and map
      pokemon.type =  details.types.flatMap((element) => element.type.name);
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.imageUrlFront = details.sprites.front_default;
      pokemon.imageUrlBack = details.sprites.back_default;
    }).catch(function (e) {
      console.error(e);
    })
  }

  // 6 SHOW DETAILS
  //showing details of the pokemon (via modal)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // 7 MODAL
  //defining function to show the modal using JQUERY
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let pokemonTitle = $('<h1 class="text-capitalize">' + pokemon.name + '</h1>')
    let pokemonImageFront = $('<img class="modal-img" style="width:30%">');
    let pokemonImageBack = $('<img class="modal-img" style="width:30%">');
    pokemonImageFront.attr('src', pokemon.imageUrlFront);
    pokemonImageBack.attr('src', pokemon.imageUrlBack);

    //display details in  a grid
    let detailsList = $('<li></li>');
    detailsList.addClass('details-list');
    let pokemonType = $('<p>Type(s): ' + pokemon.type + '</p>');
    pokemonType.addClass('type-info');
    let pokemonInfo = $('<p class="modal-info">Height: ' + pokemon.height + '</p>' +
                        '<p class="modal-info">Weight: ' + pokemon.weight + '</p>');

    modalTitle.append(pokemonTitle);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);
    modalBody.append(pokemonType);
    modalBody.append(detailsList);
    detailsList.append(pokemonInfo);

    $('#modal-container').modal();
  }

  //IIFE returns an object with public functions assigned as keys
  return {
    add: add,
    getAll: getAll,
    addList: addList,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
//__end of IIFE
}) ();


pokemonRepository.loadList().then(function () {
//Search//
  let searchForm = $('.pokemon-search')
  searchForm.on('input', function (event) {
    event.preventDefault();
    let searchString = $('#myInput').val().toLowerCase();
    $('.pokemon-app').empty('');
    if (searchString === '') {
      pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addList(pokemon);
      });
    } else {
      pokemonRepository.getAll().forEach(function (pokemon) {
        if (pokemon.name.toLowerCase().indexOf(searchString) > -1) {
          pokemonRepository.addList(pokemon);
        }
      });
    }
  });
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addList(pokemon);
  });
});
