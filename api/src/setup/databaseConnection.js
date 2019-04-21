// Imports
import { Sequelize } from 'sequelize';

// App Imports
import env from '../config/env';
import databaseConfig from '../config/database.json';
import models from '../models/index';

// Load database config
const databaseConfigEnv = databaseConfig[env];

const opts = {
  define: {
    freezeTableName: true,
  },
};

// Create new database connection
const connection = new Sequelize(
  databaseConfigEnv.database,
  databaseConfigEnv.username,
  databaseConfigEnv.password,
  {
    host: databaseConfigEnv.host,
    dialect: databaseConfigEnv.dialect,
    logging: false,
    operatorsAliases: Sequelize.Op,
    port: databaseConfigEnv.port,
  }, opts,
);

// Test connection
console.info('SETUP - Connecting database...');

connection
  .authenticate()
  .then(() => {
    console.info('INFO - Database connected.');
  }).then(() => {
    models.estado.create({
      sigla: 'RJ',
      nome: 'Rio de Janeiro',
    }).then(() => {
      models.prefeitura.create({
        municipio: {
          codigo_ibge: 8539612,
          nome: 'Município Páscoa',
          sigla: 'RJ',
        },
      }, {
        include: [
          models.municipio,
        ],
      });
      models.prefeitura.create({
        municipio: {
          codigo_ibge: 6593759,
          nome: 'Cardeal Verde',
          sigla: 'RJ',
        },
      }, {
        include: [
          models.municipio,
        ],
      });
      models.prefeitura.create({
        municipio: {
          codigo_ibge: 1537967,
          nome: 'Bom Forró',
          sigla: 'RJ',
        },
      }, {
        include: [
          models.municipio,
        ],
      });
      models.prefeitura.create({
        municipio: {
          codigo_ibge: 2597738,
          nome: 'João Pessoa',
          sigla: 'RJ',
        },
      }, {
        include: [
          models.municipio,
        ],
      });
    }).then(() => {
      console.log('INFO - Created Mock Data!');
    })
      .catch(err => console.log(`ERROR - Unable to create mock data, does it already exists? Err: ${err}`));
  })
  .catch((err) => {
    console.error('ERROR - Unable to connect to the database:', err);
  });

export default connection;
