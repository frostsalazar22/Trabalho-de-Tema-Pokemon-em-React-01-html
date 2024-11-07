// components/Sidebar.js
import React from 'react';
import './Sidebar.css';

// Componente Sidebar que exibe opções para filtrar os Pokémon por tipo
const Sidebar = ({ isOpen, closeSidebar, types, selectedTypes, toggleType }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={closeSidebar} className="close-btn">Close</button>
      <nav>
        <h3>Filtrar por Tipo</h3>
        <div className="type-filters">
          {types.map(type => (
            <div key={type} className="type-filter">
              <input
                type="checkbox"
                id={type}
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
