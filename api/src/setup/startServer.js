// Imports
import https from 'https';
import path from 'path';
import fs from 'fs';

// App Imports
import { general } from '../config/config';

// Start server
export default function (server) {
  console.info('SETUP - Starting web server...');

  if (process.env.NODE_ENV !== 'test') {
    // Start web server
    https.createServer({
      key: fs.readFileSync(path.join(__dirname, '../../certs/privatekey.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../../certs/certificate.pem')),
    }, server).listen(general.port, (error) => {
      if (error) {
        console.error('ERROR - Unable to start server.');
      } else {
        console.info(`INFO - Server started on port ${general.port}.`);
      }
    });
  } else {
    // Start web server without listening and emit handler to test routine!
    https.createServer({
      key: fs.readFileSync(path.join(__dirname, '../../certs/privatekey.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../../certs/certificate.pem')),
    }, server);
    server.emit('server_started');
  }
}
