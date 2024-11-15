/* ----------------- */
// Funções do Card Pokemon
/* ----------------- */

// Objeto contendo as cores correspondentes aos tipos de Pokémon
export const colors = {
  normal: '#B7B7A8',
  fire: '#FF4422',
  water: '#51A8FF',
  electric: '#FFD451',
  grass: '#8BD46E',
  ice: '#7CD3FF',
  fighting: '#C56E60',
  poison: '#B76EA8',
  ground: '#E2C56E',
  flying: '#9AA8FF',
  psychic: '#FF6EA8',
  bug: '#B7C543',
  rock: '#C5B67C',
  ghost: '#7D7DC5',
  dragon: '#8B7DF1',
  dark: '#8B6E60',
  steel: '#B7B7C5',
  fairy: '#F1A8F1',
};

// Função utilitária para capitalizar a primeira letra de uma string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Função para determinar a geração do Pokémon com base no seu ID
const getGeneration = (id) => {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  return 9;
};// Retorna o número da geração correspondente ao ID do Pokémon


// Função assíncrona para buscar todos os Pokémons da API
export const fetchPokemons = async () => {  // Busca os dados de cada Pokémon e os organiza em um formato adequado
  const pokemonCount = 493;
  const pokemons = [];

  for (let i = 1; i <= pokemonCount; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const pokemon = {
      id: data.id,
      name: capitalizeFirstLetter(data.name),
      types: data.types.map(type => type.type.name),
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      generation: getGeneration(data.id)
    };

    pokemons.push(pokemon);
  }

  return pokemons;
};


/* ----------------- */
// Funçoes da Linha Evolução
/* ----------------- */

// Função assíncrona para buscar a cadeia de evolução de um Pokémon
const fetchEvolutionChain = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data.chain;
};  // Busca a cadeia de evolução a partir da URL fornecida


// Função assíncrona para buscar os tipos de um Pokémon
const fetchPokemonTypes = async (speciesUrl) => {
  const speciesResp = await fetch(speciesUrl);
  const speciesData = await speciesResp.json();
  const pokemonResp = await fetch(speciesData.varieties[0].pokemon.url);
  const pokemonData = await pokemonResp.json();
  return pokemonData.types.map(type => capitalizeFirstLetter(type.type.name));
};  // Busca os tipos de um Pokémon a partir da URL da espécie


// Função assíncrona para obter as evoluções de um Pokémon
const getEvolutions = async (chain) => {
  const evolutions = [];
  const traverseEvolutions = async (node) => {
    if (node) {
      const types = await fetchPokemonTypes(node.species.url);
      evolutions.push({
        speciesName: capitalizeFirstLetter(node.species.name),
        speciesUrl: node.species.url,
        types: types,
        evolvesTo: node.evolves_to.map(evo => ({
          speciesName: capitalizeFirstLetter(evo.species.name),
          speciesUrl: evo.species.url,
          minLevel: evo.evolution_details[0]?.min_level || "N/A"
        }))
      });
      for (let evo of node.evolves_to) {
        await traverseEvolutions(evo);
      }
    }
  };
  await traverseEvolutions(chain);
  return evolutions;
};  // Recursivamente busca e monta a árvore de evoluções do Pokémon


// Função assíncrona para buscar um Pokémon específico pelo seu ID
export const fetchPokemonById = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();

  const speciesUrl = data.species.url;
  const speciesResp = await fetch(speciesUrl);
  const speciesData = await speciesResp.json();
  const evolutionChainUrl = speciesData.evolution_chain.url;
  const evolutionChain = await fetchEvolutionChain(evolutionChainUrl);
  const evolutions = await getEvolutions(evolutionChain);

  const pokemon = {
    id: data.id,
    name: capitalizeFirstLetter(data.name),
    types: data.types.map(type => capitalizeFirstLetter(type.type.name)),
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
    generation: getGeneration(data.id),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)),
    evolutions: evolutions
  };

  return pokemon;
};  // Busca os dados de um Pokémon específico e sua cadeia de evolução

