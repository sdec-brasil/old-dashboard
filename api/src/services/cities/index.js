import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { treatNestedFilters, customErr } from '../../utils';

const sqs = require('sequelize-querystring');


const listCities = async req => new Promise((resolve) => {
  const sq = sqs.withSymbolicOps(models.Sequelize, { symbolic: true });
  let where = null;
  try {
    where = req.query.filter ? sq.find(req.query.filter) : {};
  } catch (err) {
    resolve(customErr.BadFilterError);
    throw err;
  }
  treatNestedFilters(req.query.filter, where);
  models.prefeitura.findAndCountAll({
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
    resolve({ code: 200, data: response.value() });
  }).catch((err) => {
    resolve({ code: 500, data: { error: customErr.formatErr(err) } });
    throw err;
  });
});

const getCity = async req => new Promise(async (resolve) => {
  const inv = await models.prefeitura.findByPk(req.params.id,
    {
      include: [
        {
          model: models.municipio,
          include: [
            models.estado, models.regiao,
          ],
        },
      ],
    });
  if (inv) {
    resolve({ code: 200, data: inv });
  } else {
    resolve(customErr.NotFoundError);
  }
});

export default {
  listCities,
  getCity,
};
