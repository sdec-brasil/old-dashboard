// Imports
import mapRoutes from 'express-routes-mapper';

// App Imports
import routes from '../routes';


// Setup RestAPI
export default function (server) {
  console.info('SETUP - RestAPI & Routes...');

  // Get all our routes and pair them with our controllers
  const mappedRoutes = mapRoutes(routes, 'src/controllers/');

  // Map our rotes to the /rest endpoint
  server.use('/rest', mappedRoutes);
}
