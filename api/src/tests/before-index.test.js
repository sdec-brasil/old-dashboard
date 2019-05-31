/* eslint-disable func-names */
// Imports
import fixtures from 'sequelize-fixtures';
import models from '../models';

process.env.NODE_ENV = 'test';

// Temos que esperar o servidor iniciar, carregar as rotas, os modelos e as seed datas
setTimeout(() => {
  // server.on('server_started', run);
  run();
}, 3500);

// Load Mock Data
before(async function () {
  try {
    this.models = models;
    return await fixtures.loadFile(`${__dirname}/mocks/data.js`, this.models, {
      log: () => {
        console.log('TEST - Loading Mock Data');
      },
    });
  } catch (e) {
    return console.log(`error${e}`);
  }
});
