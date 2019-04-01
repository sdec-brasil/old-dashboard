import { port } from '../src/config/config.json';

const swaggerDefinition = {
  info: {
  // API informations (required)
    title: 'SDEC', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'API Pública do Sistema', // Description (optional)
  },
  host: `localhost:${port}`, // Host (optional)
  basePath: '/', // Base path (optional)
};

export default swaggerDefinition;
