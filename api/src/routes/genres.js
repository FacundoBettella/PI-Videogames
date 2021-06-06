const { Router } = require('express');
const router = Router();
const { Genre } = require('../db');

// Obetengo todos los generos de la BD
router.get('/', async (req, res) => {
    const resultGenreDB = await Genre.findAll();
    res.send(resultGenreDB.map(e => e.name))
})

module.exports = router;
