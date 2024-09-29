const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("pokemon");

const testeNome = document.querySelector(".teste-nome");

const infoButton = document.querySelector(".info-button");

async function getPokemon(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();

  return data;
}

async function setPokemon(pokemon) {
  const data = await getPokemon(pokemon);

  console.log(data);

  testeNome.innerHTML = data.name;
}

setPokemon(pokemonId);

infoButton.addEventListener("click", () => {
  window.location.replace(`./index.html?pokemon=${pokemonId}`);
});
