import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Pokedex } from '../components/PokemonCard/PokemonCard';
import InfoPoke from '../components/InfoPoke/InfoPoke';
import Favorites from '../components/Perfil/MyFavorites'; // Importa o componente de favoritos

const AppRoutes = ({ loading, filteredPokemons }) => {
  return (
    <Routes>
      <Route path="/" element={loading ? <p>Loading...</p> : <Pokedex pokemons={filteredPokemons} />} />
      <Route path="/pokemon/:id" element={<InfoPoke />} />
      <Route path="/favorites" element={<Favorites />} /> {/* Define a rota para favoritos */}
    </Routes>
  );
};

export default AppRoutes;
