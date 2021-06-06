// Models --> "Objeto" que se comunica con la base de datos.
// Rutas --> Puertas de entrada a la api.
// Controlador --> Intermediario entre las rutas y nuestra base de datos. 
const { Videogame, Genre, videogame_genre } = require('../db');
const  ModelCrud  = require('./index'); 
const { API_KEY } = process.env;
const  axios  = require('axios');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 
 
class VideogameModel extends ModelCrud {
    constructor(model){
        super(model);
    }
    // Get all by query name
    getAll = (req, res, next) => {
        if(req.query.name){
            try {
                // Busquemos en la base de datos..
                let name = req.query.name.toLowerCase().replace(/['"]+/g, '');//Saco las comillas
                let queryName = name[0].toUpperCase() + name.slice(1);
                let videogameBD = this.model.findAll({
                    attributes: ['name', 'image', 'id'],
                    where:{
                        name : {
                            [Op.like]: `%${queryName}%`
                        }
                    },
                });
                // Ahora en la Api..
                let videogameAPI = axios.get(`https://api.rawg.io/api/games?search=${queryName}&key=${API_KEY}`);
                Promise.all([videogameBD, videogameAPI])
                .then((results) => {
                    let [BDresults, APIresults] = results;
                    let endApiResults = APIresults.data.results.map(e => {
                        return {
                            name: e.name,
                            image: e.background_image,
                            id: e.id
                        }
                    })
                    const response = BDresults.concat(endApiResults);
                    res.send(response.slice(0, 15));
                }) 
            } catch (error) {
                console.log(error);
                res.status(500) //Internal server error
            }
        }
        else{
            res.status(404).json({
                message: 'Not exist a query=name on URL'
            })
        }
    }

    // Get one by id
    getById = async (req, res, next) => {
        const id = req.params.idVideogame;
        let APIvideogameResult;
        if(id) {
            // DB videogame Detail (modelado listo)
            if(id.length > 8) {
                let DBvideogame = await this.model.findOne({
                    attributes: [ 'image', 'name', 'description', 'released', 'rating', 'platforms'],
                    where: {
                        id: id,
                    },
                    include: [{
                        model: Genre
                    }] 
                })
                if(DBvideogame != undefined) {
                    res.json({
                        data: DBvideogame,
                        message: ' Database Videogame found it ♥'
                    });        
                }
                else{
                    res.status(404).json({
                        message: "The id doesn't exist in the database :/"
                    })
                }
            }
            // Api videogame Detail (modelado por hacer)
            else {
                let APIvideogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
                if(APIvideogame != undefined) {
                    APIvideogameResult = {
                        id: APIvideogame.data.id,
                        name: APIvideogame.data.name_original,
                        description: APIvideogame.data.description, //Use innerHTML in front¿?
                        released: APIvideogame.data.released,
                        image: APIvideogame.data.background_image,
                        rating: APIvideogame.data.rating,
                        platforms: APIvideogame.data.platforms.map(e => e.platform.name),
                        genres: APIvideogame.data.genres.map(e => e.name), 
                    }
                    res.json({
                        data: APIvideogameResult,
                        message: 'API Videogame found it ♥'
                    });        
                }
                else {
                    res.status(404).json({
                        message: "The id doesn't exist in the API :/"
                    })
                }               
            }
        }
        else{
            res.status(404).json({
                message: 'Not id params on URL',
            })  
        }    
    };
    
    // Post one by body 
    post = async (req, res, next) =>{
        const { name, description, released, rating, platforms, image, genres } = req.body;
        let videogameCreated = await this.model.create({
            id: uuidv4(),
            name,
            description, 
            released,
            rating,
            platforms, 
            image,
            genres
        })
        // Chequeo si el genre por body se encuentra en la genreBD
        const genreDB = await Genre.findAll({
            where: {
                name: {
                    [Op.iLike] :`%${genres}%`
                }
            }
        })
        // Mediante sequelize combino las tablas videogame y genre a través de videogame_genre.
        // funciona addGenre y addGenres
        await videogameCreated.addGenre(genreDB);
        res.status(200).json({
            data: videogameCreated,
            message: 'The game has been created succesfully'
        })
    }
}
const videogameController = new VideogameModel (Videogame);
module.exports = videogameController;