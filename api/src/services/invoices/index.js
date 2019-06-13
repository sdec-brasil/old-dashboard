import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import formatters from '../../utils/formatters';
import validate from '../../utils/validate';
import models from '../../models';
import { serializers, treatNestedFilters } from '../../utils';

const sqs = require('sequelize-querystring');

export async function InvoiceGet(req) {
  return new Promise(async (resolve) => {
    const sq = sqs.withSymbolicOps(models.Sequelize, {});
    const where = req.query.filter ? sq.find(req.query.filter) : {};
    treatNestedFilters(req.query, where);
    models.invoice.findAndCountAll({
      offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || limitSettings.invoice.get,
      where,
      order: req.query.sort ? sq.sort(req.query.sort) : [],
      include: [{
        model: models.prefeitura,
        as: 'prefeitura',
        attributes: [],
      },
      {
        model: models.block,
        as: 'block',
        attributes: [],
      },
      {
        model: models.empresa,
        as: 'emissor',
        attributes: [],
      }],
    }).then((results) => {
      const formattedResults = {};
      formattedResults.rows = results.rows.map(inv => serializers.invoice(inv));
      formattedResults.count = results.count;
      const response = new ResponseList(req, formattedResults);
      resolve({ code: 200, data: response.value() });
    }).catch((err) => {
      resolve({ code: 500, data: err.message });
      throw err;
    });
  });
}

export const lintFixer = 5;
