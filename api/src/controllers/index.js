const { v4: uuidv4 } = require('uuid')

//CRUD From Database

class ModelCrud {
    constructor(model) {
        this.model = model;
    };
    getAll = (req, res, next) => {
        return this.model.findAll()
            .then(results => res.send(results))
            .catch(err => next(err));    
    };

    getByIdParams = (req, res, next) => {
        const id = req.params.id;
        return this.model.findByPk(id)
            .then(results => res.send(results))
            .catch(err => next(err));
    };

    delete = (req, res, next) => {
        const id = req.body.id;
        return this.model.destroy({
            where : { 
                id: id
            }
        })
        .then(res.sendStatus(200))
        .catch(err => next(err));
    };

    post = (req, res, next) => {
        const post = req.body
        return this.model.create({
            ...post,
            id: uuidv4(), 
        })
        .then(results => res.send(results))
        .catch(err => next(err));
    }
}
module.exports = ModelCrud;