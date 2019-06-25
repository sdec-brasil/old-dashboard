import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { treatNestedFilters, customErr } from '../../utils';

const sqs = require('sequelize-querystring');

const listCompanies = async req => new Promise(async (resolve) => {
  const sq = sqs.withSymbolicOps(models.Sequelize, {});
  let filter = req.query.filter ? req.query.filter : '';

  if (!filter.includes('block.block_datetime')) {
    if (filter.length === 0) {
      filter += `block.block_datetime lte ${((new Date()).toISOString())}`;
    } else {
      filter += `, block.block_datetime lte ${((new Date()).toISOString())}`;
    }
  }
  const where = sq.find(filter);
  treatNestedFilters(filter, where);

  models.empresa.findAndCountAll({
    offset: parseInt(req.query.offset, 10) || 0,
    limit: parseInt(req.query.limit, 10) || limitSettings.invoice.get,
    where,
    order: req.query.sort ? sq.sort(req.query.sort) : [],
  }).then((results) => {
    const response = new ResponseList(req, results, filter);
    resolve({ code: 200, data: response.value() });
  }).catch((err) => {
    resolve({ code: 500, data: { error: customErr.formatErr(err) } });
    throw err;
  });
});

const getCompany = async req => new Promise(async (resolve) => {
  // search by cnpj
  let company = await models.empresa.findByPk(req.params.id);
  if (company) {
    resolve({ code: 200, data: company });
  } else {
    // search by public address
    company = await models.empresa.findOne({
      where: { enderecoBlockchain: req.params.id },
    });
    if (company) {
      resolve({ code: 200, data: company });
    }
  }
  resolve(customErr.NotFoundError);
});


export default {
  listCompanies,
  getCompany,
};
