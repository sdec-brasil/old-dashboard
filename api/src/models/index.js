// Imports
import Sequelize from 'sequelize';
import SequelizeImport from 'sequelize-import';

// App Imports
import databaseConnection from '../setup/databaseConnection';

const path = require('path');
const fs = require('fs');

// Importing all models from the directory and subdirectories
const models = SequelizeImport(`${__dirname}/sdec/`, databaseConnection, {
  exclude: ['index.js'],
});

// Importing all models from the blockchain directory
const PATH = `${__dirname}/blockchain/`;
const files = fs.readdirSync(PATH);
files.forEach((file) => {
  const [fileName] = file.split('.');
  models[fileName] = databaseConnection.import(path.join(PATH, fileName));
});


Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
