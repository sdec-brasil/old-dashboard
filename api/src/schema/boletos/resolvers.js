// App Imports
import models from '../../models';

// Get single boleto by ID
export async function getByID(_, { id }) {
  return models.Boleto.findByPk(id);
}

// Get all boletos from an Entity with the passed status
export async function getFromEntityWithStatus(_, { entidade, status }) {
  return models.Boleto.findAll({ where: { cnpj_empresa: entidade, status }, order: [['data_vencimento', 'DESC']] });
}
