const { Router } = require('express');
const router = Router();


// Importar todos los routers;

const videogames = require('./videogames');
const detail = require('./detail');
const create = require('./create');
const genres = require('./genres');
const DBvideogames = require('./dbvideogames');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogames); 
router.use('/detail', detail);
router.use('/create', create); 
router.use('/genres', genres);
router.use('/dbvideogames', DBvideogames);

module.exports = router;
