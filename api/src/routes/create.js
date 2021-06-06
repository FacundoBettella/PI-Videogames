const { Router } = require('express');
const router = Router();
const videogameController = require('../controllers/videogame')

router.post('/', videogameController.post);

module.exports = router;