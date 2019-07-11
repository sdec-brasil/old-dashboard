import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { treatNestedFilters, errors } from '../../utils';

const sqs = require('sequelize-querystring');


const listBlocks = (req) => {
  const sq = sqs.withSymbolicOps(models.Sequelize, { symbolic: true });
  let where = null;
  try {
    where = req.query.filter ? sq.find(req.query.filter) : {};
  } catch (err) {
    throw new errors.BadFilterError();
  }
  treatNestedFilters(req.query.filter, where);

  return models.block.findAndCountAll({
    offset: parseInt(req.query.offset, 10) || 0,
    limit: parseInt(req.query.limit, 10) || limitSettings.city.get,
    where,
    order: req.query.sort ? sq.sort(req.query.sort) : [],
  }).then((results) => {
    const response = new ResponseList(req, results);
    return { code: 200, data: response.value() };
  }).catch((err) => {
    throw err;
  });
};


const getBlock = req => models.block.findByPk(req.params.id)
  .then((inv) => {
    if (inv) {
      return { code: 200, data: inv };
    }
    throw new errors.NotFoundError('Block', `id: ${req.params.id}`);
  });


export default {
  listBlocks,
  getBlock,
};
