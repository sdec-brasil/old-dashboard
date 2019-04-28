// App Imports
import config from '../config/config.json';

// Start server
export default function (server) {
  console.info('SETUP - Starting web server...');

  // Start web server
  server.listen(config.port, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.');
    } else {
      console.info(`INFO - Server started on port ${config.port}.`);
    }
  });
}
