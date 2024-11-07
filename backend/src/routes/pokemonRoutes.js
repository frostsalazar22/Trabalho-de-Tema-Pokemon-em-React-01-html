// src/routes/pokemonRoutes.js
const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/pokemonController');
const router = express.Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:pokemonId', removeFavorite);

module.exports = router;
