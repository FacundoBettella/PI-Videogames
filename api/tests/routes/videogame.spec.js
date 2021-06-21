/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, Genre, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  id: "c379c904-7f21-4438-a841-dbf6a814c98b",
  name: 'Super Mario Bros',
  description: 'Best game ever',
  platforms: ['nintendo']
};

describe('Genre Route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Genre.sync({ force: true })
    .then(() => Genre.findAll()));
  describe('GET /api/genres', () => {
    it('should get 200',  async () =>
      await agent.get('/api/genres').expect(200)
    );
  });
});

describe('Create Route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /api/create', () => {
    it('should get 200',  () =>
      agent.get('/api/create').expect(200)
    );
  });
});

describe('Detail Route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame))
    .then(() => Videogame.findOne(
      {
        where: {
          id: 'c379c904-7f21-4438-a841-dbf6a814c98b' 
        }
      }
    )));
  describe('GET /api/detail', () => {
    it('should get 200',  () =>
      agent.get('/api/detail/c379c904-7f21-4438-a841-dbf6a814c98b').expect(200)
    );
  });
});

describe('Get Query Route', () => {
  const videogame = {
    id: "e82cf3ca-356c-4316-85d1-e6f6be44fa19",
    name: 'super mario bros',
    description: 'Really the best game ever',
    platforms: ['Nintendo']
  };
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
    
  it('responds with correct properties', async () => 
    agent.get('/api/videogames?name=super mario bros')
    .send({Object: videogame, key: 'name'})
      .then( res => {
        expect(res.body[0].name).to.deep.equal('super mario bros')
  })).timeout(4000);

  it('responds with 404 when the object is not an object', async () => 
    agent.post('/api/create')
    .send({Object: []}).expect(404)).timeout(4000);      
})








