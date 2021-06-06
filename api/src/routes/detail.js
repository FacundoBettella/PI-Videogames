const { Router } = require('express');
const router = Router();
const videogameController = require('../controllers/videogame')

router.get('/:idVideogame', videogameController.getById);

module.exports = router;