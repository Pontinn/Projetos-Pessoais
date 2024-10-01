// 1- Usar fetch para comunicar com API, usando async e await para que não retorne uma promise
// 2- Desta comunicação, obter uma resposta .JSON
// 3- Atribuir resposta à uma variavel e retornar para função

const pokemonName = document.querySelector(".pokemon-name");
const nameHifen = document.querySelector(".name-hifen");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImg = document.querySelector(".pokemon-img");

const form = document.querySelector(".form");
const input = document.querySelector(".pokemon-search");

const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("pokemon");

const infoButton = document.querySelector(".info-button");

let defaultId = pokemonId;

async function getPokemon(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();

  return data;
}

async function setPokemon(pokemon) {
  const data = await getPokemon(pokemon);

  pokemonName.innerHTML = data.name;
  nameHifen.innerHTML = "-";
  defaultId = pokemonNumber.innerHTML = data.id;

  //Houve um bug em relação ao tamanhos, sinceramente não sei se essa foi a melhor forma de resolver mas resolvi
  if (defaultId < 649) {
    pokemonImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokemonImg.style.width = "18%";
    pokemonImg.style.left = "39%";
  } else {
    //Acima do numero 649 a API não possuia mais nenhum GIF dos pokemons, então mudei a navegação para imagens estaticas
    pokemonImg.src =
      data.sprites.versions["generation-v"]["black-white"]["front_default"];
    pokemonImg.style.width = "31%";
    pokemonImg.style.left = "30%";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  setPokemon(input.value);
  input.value = "";
});

nextButton.addEventListener("click", () => {
  defaultId++;

  setPokemon(defaultId);
});

//Fazendo com que caso o numero de pokemon seja 0 e eu aperte para retroceder, ele continua sendo 0.
prevButton.addEventListener("click", () => {
  defaultId--;

  if (defaultId < 0) {
    defaultId = 0;
  } else if (defaultId === 0) {
    //Quando defaultId for zero eu quero deixar uma interroção na tela e no nome
    pokemonImg.src = "./img/interrogacao.gif";
    pokemonName.innerHTML = "?";
    nameHifen.innerHTML = "";
    pokemonNumber.innerHTML = "";
  }
  setPokemon(defaultId);
});

infoButton.addEventListener("click", () => {
  window.location.replace(`./info.html?pokemon=${defaultId}`);
});

//Chamando a função para que ela ja seja iniciada assim que abrir o site
setPokemon(defaultId);
