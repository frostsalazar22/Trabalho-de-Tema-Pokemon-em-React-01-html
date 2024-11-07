// src/components/Perfil/MyFavorites.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './MyFavorites.css'; // Importação do CSS para estilos do carrossel de favoritos

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [pokemonId, setPokemonId] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.get('/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Erro ao buscar favoritos', error);
    }
  };

  const addFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.post('/favorites', { pokemonId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites([...favorites, response.data]);
      setPokemonId('');
    } catch (error) {
      console.error('Erro ao adicionar favorito', error);
    }
  };

  const removeFavorite = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await api.delete(`/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter(fav => fav._id !== id));
    } catch (error) {
      console.error('Erro ao remover favorito', error);
    }
  };

  return (
    <div className="favorites-container">
      <h2>Meus Favoritos</h2>
      <input
        type="text"
        placeholder="ID do Pokémon"
        value={pokemonId}
        onChange={(e) => setPokemonId(e.target.value)}
      />
      <button onClick={addFavorite}>Adicionar Favorito</button>

      <div className="favorites-list">
        {favorites.map(favorite => (
          <div key={favorite._id} className="favorite-card">
            <img src={favorite.pokemonImage} alt={favorite.pokemonName} />
            <p>{favorite.pokemonName}</p>
            <button onClick={() => removeFavorite(favorite._id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
