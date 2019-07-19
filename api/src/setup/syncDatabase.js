// App Imports
import models from '../models/index';
import seed from '../data/index';

// Sync database tables
export default function () {
  console.info('SETUP - Syncing database tables...');

  // Create tables
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.info('INFO - Database sync complete.');
      seed(models)
        .then(() => {
          console.info('INFO - Done populating tables');
        })
        .catch((err) => {
          console.info('ERR - Populating Tables');
          console.log(err);
          throw new Error(err);
        });
    })
    .catch((err) => {
      console.error('ERROR - Unable to sync database.');
      throw new Error(err);
    });
}
