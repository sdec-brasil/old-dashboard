import uuid from 'uuid/v4';
import models from '../../models';


// auxiliary functions -----------------
function randint(limit) {
  return Math.floor(Math.random() * 10000) % limit;
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// field generator functions --------------------

function block_id() {
  return randint(4000);
}

function block_hash() {
  return uuid().slice(0, 5);
}

const generator = {
  block_id,
  block_hash,
};

async function newBlocks(n) {
  const blocks = [];
  for (let i = 0; i < n; i += 1) {
    const block = {};
    Object.keys(generator).forEach((key) => {
      block[key] = generator[key]();
    });
    blocks.push(block);
  }
  await models.block.bulkCreate(blocks);
  return models.block.findAll().then(x => x.map(b => b.block_id));
}


async function generateBlocks(n) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`SETUP - Generating ${n} blocks...`);
      const blocks = await newBlocks(n);

      console.log('SETUP - Associating invoices with blocks...');
      const invoices = await models.invoice.findAll();
      const updates = [];
      invoices.forEach(async (inv) => {
        const chosenBlock = choice(blocks);
        updates.push(inv.update({ blocoConfirmacaoId: chosenBlock }));
      });
      await Promise.all(updates);
      console.log('SETUP - Done populating blocks.');
      resolve(true);
    } catch (err) {
      throw err;
    }
  });
}

export default generateBlocks;
