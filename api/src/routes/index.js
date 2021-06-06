const { Router } = require('express');
const router = Router();

// **Cuando exportas por default sin llaves, sino con llaves. Tambien con llaves cuando es una palabra reservada 
// de la libreria.

// Importar todos los routers;

// const videogame = require('./videogame.js');
const videogames = require('./videogames');
const detail = require('./detail');
const create = require('./create');
const genres = require('./genres');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogames); 
router.use('/detail', detail);
router.use('/create', create); 
router.use('/genres', genres);


module.exports = router;
