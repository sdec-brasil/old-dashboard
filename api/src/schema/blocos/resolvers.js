// App Imports
import models from '../../models';

// Get block by hash
export async function getByHash(parentValue, { hash }) {
  return models.Bloco.findOne({ where: { hash } });
}

// Get block by height
export async function getByHeight(parentValue, { height }) {
  return models.Bloco.findOne({ where: { altura: height } });
}

// Get all blocks
export async function getAll() {
  return models.Bloco.findAll({ order: [['altura', 'DESC']] });
}
