// Imports
import fixtures from 'sequelize-fixtures';

export default function (models) {
  console.log('SETUP - Starting to populate tables with Initial Data');

  return new Promise((resolve, reject) => {
    fixtures.loadFile(`${__dirname}/estado/estados.js`, models, { log: () => {} })
      .then(() => {
        fixtures.loadFile(`${__dirname}/regiao/regioes.js`, models, { log: () => {} })
          .then(() => {
            // fixtures.loadFile(`${__dirname}/municipio/municipios.js`, models, { log: () => {} })
            // .then(() => {
            fixtures.loadFile(`${__dirname}/user/users.js`, models, { log: () => {} })
              .then(() => {
                fixtures.loadFile(`${__dirname}/client/clients.js`, models, { log: () => {} })
                  .then(() => {
                    fixtures.loadFile(`${__dirname}/authorization_codes/authorization_codes.js`, models, { log: () => {} })
                      .then(() => {
                        resolve();
                      });
                  });
              });
            // });
          });
      })
      .catch(err => reject(err));
  });
}
