// Imports
import Sequelize from 'sequelize';

// App Imports
import databaseConnection from '../setup/databaseConnection';

const models = {
  Thought: databaseConnection.import('./thought'),
  Bloco: databaseConnection.import('./bloco'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
