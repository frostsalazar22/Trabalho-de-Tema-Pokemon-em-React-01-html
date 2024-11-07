// Importações necessárias
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPokemonById } from '../../services/pokeApi.js';
import { colors } from '../../services/pokeApi.js'; // Importa o objeto de cores
import { getEffectiveness } from '../../services/Efetividade.js';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import './InfoPoke.css';

// Componente EvoCard para representar um cartão de evolução
const EvoCard = ({ pokemon }) => {
  const primaryType = pokemon.types[0].toLowerCase(); // Obtém o primeiro tipo e o converte para minúsculas
  const color = colors[primaryType] || '#D2B48C'; // Define a cor de fundo baseada no primeiro tipo

  return (
    <div className="EvoCard" style={{ backgroundColor: color }}> {/* Aplica a cor de fundo */}
      <Link to={`/pokemon/${pokemon.name.toLowerCase()}`}>
        <img src={pokemon.img} alt={pokemon.name} />
        <div>
          <h3>{pokemon.name}</h3>
          <p>{pokemon.types.join(', ')}</p>
        </div>
      </Link>
    </div>
  );
};

// Componente InfoPoke para exibir os detalhes de um Pokémon específico
const InfoPoke = () => {
  const { id } = useParams(); // Obtém o parâmetro ID da URL
  const [pokemon, setPokemon] = useState(null); // Estado para armazenar os detalhes do Pokémon
  const [wrapClass, setWrapClass] = useState(''); // Estado para controlar a classe de wrap

  useEffect(() => {
    // Função assíncrona para buscar e definir os detalhes do Pokémon
    const getPokemon = async () => {
      const data = await fetchPokemonById(id);
      setPokemon(data);
    };
    getPokemon();
  }, [id]);

  useEffect(() => {
    if (pokemon && pokemon.evolutions.length > 4) {
      setWrapClass('wrap');
    } else {
      setWrapClass('');
    }
  }, [pokemon]);

  // Se os detalhes do Pokémon ainda não foram carregados, exibe uma mensagem de carregamento
  if (!pokemon) {
    return <div>Loading...</div>;
  }
  
  // Calcula a efetividade dos tipos do Pokémon
  const effectiveness = getEffectiveness(pokemon.types);

  return (
    <div className="pokemon-details">
      <h2>
        <Link to="../">
          <ArrowCircleLeftIcon className="iconStyle" />
        </Link>
        <span className="nameStyle">{pokemon.name}</span>
      </h2>
      <div className="images">
        <div className="image-container">
          <img src={pokemon.img} alt={pokemon.name} />
          <p>Normal</p>
        </div>
        <div className="image-container">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`} alt={`${pokemon.name} Shiny`} />
          <p>Shiny</p>
        </div>
      </div>
      <table className="info-table">
        <tbody>
          <tr>
            <td><strong>ID da Pokedex:</strong></td>
            <td>{pokemon.id}</td>
          </tr>
          <tr>
            <td><strong>Tipo do Pokemon:</strong></td>
            <td>{pokemon.types.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Altura:</strong></td>
            <td>{pokemon.height / 10} m</td>
          </tr>
          <tr>
            <td><strong>Peso:</strong></td>
            <td>{pokemon.weight / 10} kg</td>
          </tr>
          <tr>
            <td><strong>Habilidades:</strong></td>
            <td>{pokemon.abilities.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Forte contra:</strong></td>
            <td>{effectiveness.strong.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Fraco contra:</strong></td>
            <td>{effectiveness.weak.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Imune contra:</strong></td>
            <td>{effectiveness.immune.join(', ')}</td>
          </tr>
        </tbody>
      </table>
      <div className="evolution-line">
        <h3>Linha Evolutiva</h3>
        <div className={`evolution-cards ${wrapClass}`}>
          {pokemon.evolutions.map((evo, index) => (
            <EvoCard 
              key={index} 
              pokemon={{ 
                name: evo.speciesName, 
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.speciesUrl.split('/')[6]}.png`, 
                types: evo.types
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPoke;
