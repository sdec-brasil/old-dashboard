// Imports
import mapRoutes from 'express-routes-mapper';
import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

// App Imports
import routes from '../routes';
import swaggerDefinition from '../../docs/definition';


// Setup RestAPI
export default function (server) {
  console.info('SETUP - RestAPI & Routes...');

  // Get all our routes and pair them with our controllers
  const mappedRoutes = mapRoutes(routes, 'src/controllers/');

  // Map our rotes to the /rest endpoint
  server.use('/rest', mappedRoutes);

  // Options for the swagger docs
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/index.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  fs.writeFile('./docs/swagger.json', JSON.stringify(swaggerSpec), (err) => {
    if (err) console.log(`SETUP - Failed to create docs: ${err}`);
    else console.log('SETUP - Docs created');
  });
}
