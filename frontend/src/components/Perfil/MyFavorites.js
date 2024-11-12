import React, { useState, useEffect } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fetchPokemonById } from '../../services/pokeApi';
import MyPokemonCard from './MyPokemonCard';
import './MyFavorites.css';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [pokemonId, setPokemonId] = useState('');

  useEffect(() => {
    // Carrega os favoritos ao fazer login
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        loadFavorites(user.uid);
      } else {
        setFavorites([]); // Limpa favoritos ao deslogar
      }
    });
    return () => unsubscribe();
  }, []);

  const loadFavorites = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "Users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favoritePokemons = await Promise.all(
          userData.favorites.map(async (id) => await fetchPokemonById(id))
        );
        setFavorites(favoritePokemons);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error.message);
    }
  };

  const addFavorite = async () => {
    const user = auth.currentUser;
    if (!user || !pokemonId) return;

    try {
      const newPokemon = await fetchPokemonById(pokemonId);
      const userDocRef = doc(db, "Users", user.uid);

      // Adiciona o ID do Pokémon aos favoritos no Firestore
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedFavorites = [...userData.favorites, pokemonId];
        await updateDoc(userDocRef, { favorites: updatedFavorites });

        // Atualiza o estado local com o novo Pokémon
        setFavorites([...favorites, newPokemon]);
        setPokemonId(''); // Limpa o campo de entrada
      }
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error.message);
    }
  };

  const removeFavorite = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDocRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedFavorites = userData.favorites.filter(favId => favId !== id);
        await updateDoc(userDocRef, { favorites: updatedFavorites });

        // Remove o Pokémon do estado local
        setFavorites(favorites.filter(fav => fav.id !== id));
      }
    } catch (error) {
      console.error("Erro ao remover favorito:", error.message);
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
          <MyPokemonCard
            key={favorite.id}
            pokemon={favorite}
            onRemove={() => removeFavorite(favorite.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
