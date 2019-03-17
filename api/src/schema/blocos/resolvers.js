// App Imports
import models from '../../models';

// Get all blocks
export async function getAll(_, { altura }) {
  if (altura) {
    return models.Bloco.findAll({ order: [['altura', 'DESC']], offset: altura, limit: 15 });
  }
  return models.Bloco.findAll({ order: [['altura', 'DESC']], limit: 15 });
}
// Get single block by constraint
export async function getByConstraint(_, { id }) {
  if (id === 0) {
    return models.Bloco.findOne({ where: { hash: id } });
  }
  return models.Bloco.findOne({ where: { altura: id } });
}
