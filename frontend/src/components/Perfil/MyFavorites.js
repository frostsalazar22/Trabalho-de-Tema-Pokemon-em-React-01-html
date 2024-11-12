// src/components/Perfil/MyFavorites.js
import React, { useState, useEffect } from 'react';
import { db, auth } from "../../services/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './MyFavorites.css'; // Importação do CSS para estilos do carrossel de favoritos

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [pokemonId, setPokemonId] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const favoritesCol = collection(db, "users", user.uid, "favorites");
    const snapshot = await getDocs(favoritesCol);
    setFavorites(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addFavorite = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const favoritesCol = collection(db, "users", user.uid, "favorites");
    await addDoc(favoritesCol, { pokemonId });
    setPokemonId("");
    fetchFavorites();
  };

  const removeFavorite = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "favorites", id));
    fetchFavorites();
  };

  return (
    <div className="favorites-container">
      <h2>My Favorites</h2>
      <input type="text" placeholder="Pokemon ID" value={pokemonId} onChange={(e) => setPokemonId(e.target.value)} />
      <button onClick={addFavorite}>Add Favorite</button>
      <ul>
        {favorites.map(fav => (
          <li key={fav.id}>
            {fav.pokemonId}
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFavorites;
