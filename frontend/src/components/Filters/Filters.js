import React from 'react';

// Componente Filters para exibir os filtros de tipos de Pokémon
const Filters = ({ selectedTypes, setSelectedTypes }) => {
  // Lista de todos os tipos de Pokémon
  const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

  // Função para lidar com a mudança de seleção de tipo
  const handleTypeChange = (type) => {
    setSelectedTypes(prevTypes =>
      // Adiciona ou remove o tipo da lista de tipos selecionados
      prevTypes.includes(type) ? prevTypes.filter(t => t !== type) : [...prevTypes, type]
    );
  };

  return (
    <div className="container-filters">
      <div className="filter-by-type">
        <span>Tipo</span>
        {types.map(type => (
          <div className="group-type" key={type}>
            <input type="checkbox" name={type} id={type} onChange={() => handleTypeChange(type)} />
            <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
