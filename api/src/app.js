const express = require('express');
const cookieParser = require('cookie-parser'); //Nos permite configurar cookies dentro de nuestro servidor.
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler');
const setHeaders = require('./middlewares/setHeader')

require('./db.js');

const server = express();

server.name = 'API';

// ------MIDDLEWARES
server.use(express.urlencoded({ extended: true, limit: '50mb' }));         // JsonParser
// server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); 
server.use(express.json({ limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev')); // Da un Output en la consola por c/ request.
server.use(cookieParser());
server.use(setHeaders);

// ------CONTROL DE ERRORES - Endeware
server.use(errorHandler)

// ------ROUTES
server.use('/api', routes);

// ------Landing page
server.use('/', (req, res, next)=>{
  res.send('VIDEOGAME APP :P')
})



module.exports = server;
