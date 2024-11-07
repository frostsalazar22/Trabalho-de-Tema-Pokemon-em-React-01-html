// src/models/favorite.js
const { db } = require('../config/firebase');

class Favorite {
  static async addFavorite(userId, pokemonId) {
    const favoriteRef = db.collection('favorites').doc(userId);
    await favoriteRef.set(
      { pokemonIds: admin.firestore.FieldValue.arrayUnion(pokemonId) },
      { merge: true }
    );
  }

  static async removeFavorite(userId, pokemonId) {
    const favoriteRef = db.collection('favorites').doc(userId);
    await favoriteRef.update({
      pokemonIds: admin.firestore.FieldValue.arrayRemove(pokemonId)
    });
  }

  static async getFavorites(userId) {
    const favoriteRef = db.collection('favorites').doc(userId);
    const doc = await favoriteRef.get();
    return doc.exists ? doc.data().pokemonIds : [];
  }
}

module.exports = Favorite;
