
/* eslint-disable quote-props */
import { docker } from '../utils';

const Multichain = require('multinodejs');

const dockers = docker;

const masterPort = 8001;
const masterPassword = 'this-is-insecure-change-it';
const slavePort = 8002;

const stream = 'events';

const master = {};
const slave = {};

async function setupChainConnection() {
  console.log('Connecting to chain...');
  let slavePassword = await dockers.exec(
    'docker exec docker-multichain_slavenode_1 cat root/.multichain/MyChain/multichain.conf',
  );
  slavePassword = dockers.extractPassword(slavePassword);

  slave.node = Multichain({
    port: slavePort,
    host: 'localhost',
    user: 'multichainrpc',
    pass: slavePassword,
  });
  slave.addr = '';

  slave.addr = (await slave.node.getAddresses())['0'].toString();

  master.node = Multichain({
    port: masterPort,
    host: 'localhost',
    user: 'multichainrpc',
    pass: masterPassword,
  });
  master.addr = '';

  master.addr = (await master.node.getAddresses())['0'].toString();

  await dockers.exec(`docker exec docker-multichain_masternode_1 multichain-cli MyChain grant ${slave.addr} activate,mine 0`);
  console.log('Connected');
}

export { setupChainConnection, master, slave };
