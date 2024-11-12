import React from 'react';
import './MyPokemonCard.css';

const MyPokemonCard = ({ pokemon, onRemove }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-header" style={{ backgroundColor: '#78C850' }}>
        <h2>{pokemon.name}</h2>
        <span>#{pokemon.id.toString().padStart(3, '0')}</span>
      </div>
      
      <img src={pokemon.img} alt={pokemon.name} className="pokemon-image" />
      
      {pokemon.stats && (
        <div className="pokemon-stats">
          {pokemon.stats.map(stat => (
            <div key={stat.name} className="stat-row">
              <span>{stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}</span>
              <span>{stat.value}</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${stat.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={onRemove} className="remove-button">Remover</button>
    </div>
  );
};

export default MyPokemonCard;
