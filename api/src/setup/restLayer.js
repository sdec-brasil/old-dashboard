import RestAdapter from 'rest-graphql';
// import * as block from '../schema/blocos/resolvers';

const QUERY = `query block{
  blocks {
    hash
  }
}`;

export default function (server) {
  console.info('SETUP - Rest Layer...');

  const adapter = new RestAdapter({
    isError: response => !!response.errors,
    transformError: response => response.errors[0].http_secret,
  });

  adapter.addEndpoint({
    path: '/blocks',
    getQuery: request => QUERY,
    transformSuccess: response => ({ status: 200, body: response.blocks }),
  });

  server.use(adapter.app);
}
