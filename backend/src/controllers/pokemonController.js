// src/controllers/pokemonController.js
const Favorite = require('../models/favorite');

const addFavorite = async (req, res) => {
  const userId = req.user.uid;
  const { pokemonId } = req.body;
  try {
    await Favorite.addFavorite(userId, pokemonId);
    res.status(200).send({ message: 'Favorite added' });
  } catch (error) {
    res.status(400).send({ message: 'Error adding favorite', error });
  }
};

const getFavorites = async (req, res) => {
  const userId = req.user.uid;
  try {
    const favorites = await Favorite.getFavorites(userId);
    res.status(200).send(favorites);
  } catch (error) {
    res.status(400).send({ message: 'Error retrieving favorites', error });
  }
};

const removeFavorite = async (req, res) => {
  const userId = req.user.uid;
  const { pokemonId } = req.params;
  try {
    await Favorite.removeFavorite(userId, pokemonId);
    res.status(200).send({ message: 'Favorite removed' });
  } catch (error) {
    res.status(400).send({ message: 'Error removing favorite', error });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
