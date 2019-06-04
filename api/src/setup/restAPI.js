// Imports
import mapRoutes from 'express-routes-mapper';
import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

// App Imports
import routes from '../routes';
import swaggerDefinition from '../../docs/definition';
import RestExample from '../controllers/RestExample';
import OAuth2 from '../controllers/oauth/OAuth2';
import Client from '../controllers/oauth/Client';
import User from '../controllers/oauth/User';
import Auth from '../controllers/oauth/Auth';
import Token from '../controllers/oauth/Token';

// Setup RestAPI
export default function (server) {
  console.info('SETUP - RestAPI & Routes...');

  // Get all our routes and pair them with our controllers
  const mappedRoutes = mapRoutes(routes, 'src/controllers/');

  // Map our rotes to the /v1 endpoint
  server.use('/v1', mappedRoutes);

  // For demonstrations
  server.get('/', RestExample.index);
  server.get('/success', RestExample.test);
  server.get('/login', Auth.loginPage);
  server.post('/login', Auth.login);
  server.get('/logout', Auth.logout);
  server.get('/account', Auth.account);
  server.get('/dialog/authorize', OAuth2.authorization);
  server.post('/dialog/authorize/decision', OAuth2.decision);
  server.post('/oauth/token', OAuth2.token);
  server.get('/api/userinfo', User.info);
  server.get('/api/clientinfo', Client.info);
  server.get('/api/tokeninfo', Token.info);
  server.get('/api/revoke', Token.revoke);
  server.get('/test', Token.test);


  // Options for the swagger docs
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/**/*.js', './src/models/sdec/**/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  fs.writeFile('./docs/swagger.json', JSON.stringify(swaggerSpec, null, 4), (err) => {
    if (err) console.log(`SETUP - Failed to create docs: ${err}`);
    else console.log('SETUP - Docs created');
  });

  server.get('/docs', (req, res) => res.send(swaggerSpec));
}
