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

let defaultId = 0;

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
  if (defaultId < 649) {
    pokemonImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
  } else {
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

prevButton.addEventListener("click", () => {
  defaultId--;

  if (defaultId < 0) {
    defaultId = 0;
  } else if (defaultId === 0) {
    pokemonImg.src = "./img/interrogacao.gif";
    pokemonName.innerHTML = "?";
    nameHifen.innerHTML = "";
    pokemonNumber.innerHTML = "";
  }
  setPokemon(defaultId);
});

/*
let datatest = localStorage.getItem("pokemon");

let dataTestConvert = JSON.parse(datatest);
*/
