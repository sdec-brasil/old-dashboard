import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { serializers, treatNestedFilters, customErr } from '../../utils';

const sqs = require('sequelize-querystring');

const listInvoices = async req => new Promise(async (resolve) => {
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
    formattedResults.rows = results.rows.map(inv => serializers.invoice.serialize(inv));
    formattedResults.count = results.count;
    const response = new ResponseList(req, formattedResults, filter);
    resolve({ code: 200, data: response.value() });
  }).catch((err) => {
    resolve({ code: 500, data: { error: customErr.formatErr(err) } });
    throw err;
  });
});

const getInvoice = async req => new Promise(async (resolve) => {
  const inv = await models.invoice.findByPk(req.params.txid);
  if (inv) {
    resolve({ code: 200, data: serializers.invoice.serialize(inv) });
  } else {
    resolve(customErr.NotFoundError);
  }
});

const postInvoice = async req => new Promise(async (resolve) => {
  try {
    const invoiceInfo = serializers.invoice.deserialize(req.body);
    const inv = await models.invoice.create(invoiceInfo);
    console.log('inv', inv);
    resolve({ code: 201, data: serializers.invoice.serialize(inv) });
  } catch (err) {
    const errors = {};
    console.log(err);
    resolve({ code: 400, data: err });

    // if (err.errors && Array.isArray(err.errors)) {
    //   err.errors.forEach((e) => {
    //     errors[e.path] = e.message;
    //   });
    //   resolve({ code: 400, data: { errors } });
    // } else {
    //   resolve({ code: 400, data: { error: customErr.formatErr(err) } });
    // }
  }
});

const replaceInvoice = async req => new Promise(async (resolve) => {
  try {
    const invoiceInfo = serializers.invoice.deserialize(req.body);
    invoiceInfo.substitutes = req.params.txid;
    const inv = await models.invoice.create(invoiceInfo);
    await models.invoice.update(
      { substitutedBy: inv.txId },
      {
        where: {
          txId: inv.substitutes,
        },
      },
    );
    resolve({ code: 201, data: serializers.invoice.serialize(inv) });
  } catch (err) {
    const errors = {};
    console.log(err);
    resolve({ code: 400, data: err });
  }
});


export default {
  listInvoices,
  getInvoice,
  postInvoice,
  replaceInvoice,
};
