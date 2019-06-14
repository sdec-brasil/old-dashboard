

import models from '../models/index';
import data_estados from '../data/estado/estados';

const mock_data = data_estados;


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Estado', mock_data, {}),

  down: (queryInterface, Sequelize) => {},
};
