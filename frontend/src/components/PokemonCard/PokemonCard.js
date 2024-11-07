import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PokemonCard.css';
import { colors } from '../../services/pokeApi.js';

// Componente PokemonCard que representa um cartão de Pokémon
const PokemonCard = ({ pokemon }) => {
    // Estado para controlar o hover
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // Função para lidar com o clique no cartão do Pokémon
    const handleClick = () => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    // Obtém a cor do tipo primário do Pokémon ou usa branco como padrão
    const primaryType = pokemon.types[0];
    const color = colors[primaryType] || '#FFF';

    return (
        <div 
            className="pokemon" 
            style={{ backgroundColor: color }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className="imgContainer" style={{ display: isHovered ? 'none' : 'block' }}>
                <img src={pokemon.img} alt={pokemon.name} />
            </div>
            <div className="info">
                <span className="number" style={{ display: isHovered ? 'none' : 'block' }}>#{pokemon.id.toString().padStart(3, '0')}</span>
                <h3 className="name">{pokemon.name}</h3>
                {isHovered && (
                    <small className="type">
                        Generation: {pokemon.generation}<br />
                        Type: {pokemon.types.join(', ')}
                    </small>
                )}
            </div>
        </div>
    );
};

// Componente Pokedex que representa uma lista de cartões de Pokémon
export const Pokedex = ({ pokemons }) => {
    const navigate = useNavigate();
    
    // Função para lidar com o clique em um cartão de Pokémon
    const handleClick = (pokemonId) => {
        navigate(`/pokemon/${pokemonId}`);
    };

    return (
      <div className="pokeContainer">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => handleClick(pokemon.id)} />
        ))}
      </div>
    );
};
