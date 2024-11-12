// src/routes/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Pokedex } from '../components/PokemonCard/PokemonCard';
import InfoPoke from '../components/InfoPoke/InfoPoke';
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import MyFavorites from '../components/Perfil/MyFavorites';

const AppRoutes = ({ loading, filteredPokemons }) => {
  return (
    <Routes>
      <Route path="/" element={loading ? <p>Loading...</p> : <Pokedex pokemons={filteredPokemons} />} />
      <Route path="/pokemon/:id" element={<InfoPoke />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorites" element={<MyFavorites />} />
    </Routes>
  );
};

export default AppRoutes;
