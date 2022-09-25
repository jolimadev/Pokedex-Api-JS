
const pokemonContainer = document.querySelector(".pokemon-container")
const spinner = document.querySelector("#spinner")
const previous = document.querySelector('#previous')
const next = document.querySelector('#next')

let offset = 1;
let limit = 8;

previous.addEventListener('click', () => {
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
});

next.addEventListener('click', () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});


function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none"; //we hide it after change it to the next pokemon
        })
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block"; //stop the spinner after show the pokemon,
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}
//function to show a pokemon on a cord

function createPokemon(pokemon) {
    //flip the card
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);
    //flip the card
    const card = document.createElement('div');
    card.classList.add('pokemon-block')

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default // this ability is showed on the front 

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name // one of the many props of the pokemon

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)
    //div back side or back part, in this case of the card:
    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    // cardBack.textContent = 'Card from the Back';
    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}
//progressBar:
function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) { //i only want the first 3stats
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + "%";
        const statContainer = document.createElement("div");
        statContainer.classList.add("stat-container");

        const statName = document.createElement("div");
        statName.textContent = stat.stat.name;

        const progress = document.createElement("div");
        progress.classList.add("progress");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}




function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}
//remove an element, while this element have a first child
//mientras en el contenedor haya una card..quitarla asi trae algo nuevo.
fetchPokemons(offset, limit);


//LIMIT y OFFSET le permiten obtener una selección de las filas que se generan con la consulta.
//Con LIMIT, puede restringir el número de resultados obtenidos a una cierta cantidad. No se obtendrá más que la cantidad máxima de filas (posiblemente menos si la consulta devuelve menos filas). Con OFFSET, puede omitir una cierta cantidad de filas antes de comenzar a devolver las filas resultantes de la consulta.



