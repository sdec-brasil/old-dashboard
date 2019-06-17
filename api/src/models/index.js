// Imports
import Sequelize from 'sequelize';
import SequelizeImport from 'sequelize-import';

// App Imports
import databaseConnection from '../setup/databaseConnection';

const path = require('path');

// Importing all models from the directory and subdirectories
const models = SequelizeImport(`${__dirname}/sdec/`, databaseConnection, {
  exclude: ['index.js'],
});

models.block = databaseConnection.import(path.join(`${__dirname}/blockchain/`, 'block.js'));

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
