const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const maxId = 649;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = '';
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found';
        pokemonId.innerHTML = '';
    }

    if (searchPokemon > maxId) {
        pokemonName.innerHTML = 'End List';
        pokemonId.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();        
    renderPokemon(input.value.toLowerCase());
})

renderPokemon('1');

btnPrev.addEventListener('click', () => {       
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);

    }
})

btnNext.addEventListener('click', () => {        
        searchPokemon += 1;
        renderPokemon(searchPokemon);
})

