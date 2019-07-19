// Imports
import fixtures from 'sequelize-fixtures';
import process from 'process';
import generateInvoices from './invoice/generateInvoices';
import generateBlocks from './block/generateBlocks';

export default function (models) {
  console.log('SETUP - Starting to populate tables with Initial Data');

  return new Promise(async (resolve, reject) => {
    const noLogs = { log: () => {} };
    try {
      await fixtures.loadFile(`${__dirname}/estado/estados.js`, models, noLogs);
      await fixtures.loadFile(`${__dirname}/regiao/regioes.js`, models, noLogs);
      if (process.env.NODE_ENV === 'production') {
        fixtures.loadFile(`${__dirname}/municipio/municipios.js`, models, noLogs);
      } else {
        await fixtures.loadFile(`${__dirname}/municipio/municipiosSmall.js`, models, noLogs);
        await fixtures.loadFile(`${__dirname}/prefeitura/prefeituras.js`, models, noLogs);
        // await fixtures.loadFile(`${__dirname}/empresa/empresas.js`, models, noLogs);
        // await fixtures.loadFile(`${__dirname}/user/users.js`, models, noLogs);
        await fixtures.loadFile(`${__dirname}/client/clients.js`, models, noLogs);
        // await fixtures.loadFile(`${__dirname}/authorizationCode/authorizationCodes.js`, models, noLogs);
        // await generateInvoices(500);
        // await generateBlocks(4);
      }
      process.emit('dataLoaded');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
