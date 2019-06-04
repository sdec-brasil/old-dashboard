const NodeEnvironment = require('jest-environment-node');
const app = require('../index');

const server = new Promise(((resolve, reject) => {
  process.on('dataLoaded', resolve);
}));

class CustomNodeEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    await server();
    this.global.server = app;
  }
}


module.exports = CustomNodeEnvironment;
