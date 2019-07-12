import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { treatNestedFilters, errors } from '../../utils';

const sqs = require('sequelize-querystring');


const listCities = async (req) => {
  const sq = sqs.withSymbolicOps(models.Sequelize, { symbolic: true });
  let where = null;
  try {
    where = req.query.filter ? sq.find(req.query.filter) : {};
  } catch (err) {
    throw errors.BadFilterError();
  }
  treatNestedFilters(req.query.filter, where);
  return models.prefeitura.findAndCountAll({
    offset: parseInt(req.query.offset, 10) || 0,
    limit: parseInt(req.query.limit, 10) || limitSettings.city.get,
    where,
    order: req.query.sort ? sq.sort(req.query.sort) : [],
    include: [
      {
        model: models.municipio,
        include: [
          models.estado, models.regiao,
        ],
      },
    ],
  }).then((results) => {
    const response = new ResponseList(req, results);
    return { code: 200, data: response.value() };
  }).catch((err) => {
    throw err;
  });
};

const getCity = async req => models.prefeitura.findByPk(req.params.id,
  {
    include: [
      {
        model: models.municipio,
        include: [
          models.estado, models.regiao,
        ],
      },
    ],
  })
  .then((inv) => {
    if (inv) {
      return { code: 200, data: inv };
    }
    throw new errors.NotFoundError('City', `id ${req.params.id}`);
  });

export default {
  listCities,
  getCity,
};
