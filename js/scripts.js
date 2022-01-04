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
];


//loop over the list of pokemons and write down their names and heights
for (let i = 0; i < pokemonList.length; i++) {
    document.write('<br>' + pokemonList[i].name + ('  (height: ') + pokemonList[i].height + ')');
    //comment the pokemons according to their heigth
    //height between 0.5 and 1.7
    if (pokemonList[i].height < 1.7 && pokemonList[i].height > 0.5) {
      document.write(' - this pokemon is kind of average...');
    }
    //smaller or equal to 0.5
    else if (pokemonList[i].height <= 0.5) {
      document.write(' - this pokemon is really tiny!');
    }
    //larger or equal to 1.7
    else {
      document.write(' - this pokemon is bigger than I thought!');
    }
  }
