// App Imports
import models from '../../models';

// Get thoughts by ID
export async function getById(parentValue, { id }) {
  return models.Thought.findOne({ where: { id } });
}

// Get all thoughts
export async function getAll() {
  return models.Thought.findAll({ order: [['createdAt', 'DESC']] });
}

// Create thought
export async function create(parentValue, { name, thought }) {
  return models.Thought.create({ name, thought });
}

// Delete thought
export async function remove(parentValue, { id }) {
  return models.Thought.destroy({ where: { id } });
}
