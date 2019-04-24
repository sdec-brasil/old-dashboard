// Imports
import fixtures from 'sequelize-fixtures';

export default function (models) {
  console.log('SETUP - Starting to populate tables with Initial Data');

  return new Promise((resolve, reject) => {
    fixtures.loadFile(`${__dirname}/estado/estados.js`, models)
      .then(() => {
        fixtures.loadFile(`${__dirname}/regiao/regioes.js`, models)
          .then(() => {
            fixtures.loadFile(`${__dirname}/municipio/municipios.js`, models)
              .then(() => {
                resolve();
              });
          });
      })
      .catch(err => reject(err));
  });
}
