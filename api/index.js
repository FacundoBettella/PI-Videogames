//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = 3001;
const { API_KEY } = process.env
const axios = require('axios');
const { Genre } = require('./src/db')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console

    // Junto con el montaje del servidor cargamos generos en la base de datos.
    try {
      const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const apiGenresResults = apiGenres.data.results.map(e => e.name)
      const SortapiGenresResults = apiGenresResults.sort();
      SortapiGenresResults.map(e=>{
        Genre.findOrCreate({
          where: {
            name: e
          },
        })
      })  
    } catch (error) {
      console.log(error);
    }       
  });
});
