
//wrap pokemonList array in an IIFE to avoid accidentally accessing the global state

//new pokemonRepository variable to hold what the IIFE will return
//assign the IIFE to that variable

//__beginning of IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');


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
  //recommendation:
  //break down the function into 2 smaller functions
  // 1 creating list item (button)
  function createListItem(name) {
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = name;
    button.classList.add("button-class");
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    return button
  }
  // 2 showing details via click event
  function addListItem(pokemon) {
    const button = createListItem(pokemon.name)
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
      pokemon.types =  details.types.flatMap((element) => element.type.name);
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.imageURL = details.sprites.front_default;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //showing details of the pokemon (via modal)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //defining function to show the modal
  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;

    let pokemonType = document.createElement('p');
    pokemonType.innerText = 'Type(s): ' + pokemon.types;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + pokemon.height;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-modal-image');
    pokemonImage.src = pokemon.imageURL;

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonType);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //IIFE returns an object with public functions assigned as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
//__end of IIFE
}) ();


pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
