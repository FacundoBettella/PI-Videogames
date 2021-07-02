const { Router } = require('express');
const router = Router();
const videogameController = require('../controllers/videogame')

router.get('/', videogameController.getDBgames);

module.exports = router;