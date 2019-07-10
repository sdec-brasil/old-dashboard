import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import {
  serializers, treatNestedFilters, customErr, query,
} from '../../utils';


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
  let where = null;
  try {
    where = sq.find(filter);
  } catch (err) {
    resolve(customErr.BadFilterError);
    throw err;
  }
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
    // getting token to identify user and user's company
    const tk = req.headers.authorization.split(' ')[1];
    const token = await query.accessTokens.findByToken(tk);
    const user = await models.user.findByPk(token.user_id);
    if (user === null) {
      throw new Error('O usuário ao qual seu token se refere não foi encontrado.');
    }
    if (user.empresaCnpj === null) {
      throw new Error('Esse usuário não pertence à uma empresa, logo não pode emitir notas fiscais');
    }

    const invoiceInfo = serializers.invoice.deserialize(req.body);

    // setting enderecoEmissor
    const empresa = await models.empresa.findByPk(user.empresaCnpj, { raw: true });
    invoiceInfo.enderecoEmissor = empresa.enderecoBlockchain;
    // setting blocoConfirmacaoId
    const lastBlock = await models.block.findOne({ raw: true });
    invoiceInfo.blocoConfirmacaoId = lastBlock.block_id;
    // performing invoice creation
    const inv = await models.invoice.create(invoiceInfo);
    resolve({ code: 201, data: serializers.invoice.serialize(inv) });
  } catch (err) {
    console.log(err);
    resolve({ code: 500, data: err.message });
  }
});

const replaceInvoice = async req => new Promise(async (resolve) => {
  try {
    // getting token to identify user and user's company
    const tk = req.headers.authorization.split(' ')[1];
    const token = await query.accessTokens.findByToken(tk);
    const user = await models.user.findByPk(token.user_id);
    if (user === null) {
      throw new Error('O usuário ao qual seu token se refere não foi encontrado.');
    }
    if (user.empresaCnpj === null) {
      throw new Error('Esse usuário não pertence à uma empresa, logo não pode emitir notas fiscais');
    }

    const oldInvoice = await models.invoice.findByPk(req.params.txid, { raw: true });
    if (oldInvoice === null) {
      throw new Error('Essa invoice não existe.');
    }

    const invoiceInfo = serializers.invoice.deserialize(req.body);

    // setting enderecoEmissor
    const empresa = await models.empresa.findByPk(user.empresaCnpj, { raw: true });
    if (oldInvoice.enderecoEmissor != empresa.enderecoBlockchain) {
      throw new Error('A invoice que se quer alterar não foi emitida pela sua empresa.');
    }
    invoiceInfo.enderecoEmissor = empresa.enderecoBlockchain;

    // setting blocoConfirmacaoId
    const lastBlock = await models.block.findOne({ raw: true });
    invoiceInfo.blocoConfirmacaoId = lastBlock.block_id;
    // setting substitutes field
    invoiceInfo.substitutes = oldInvoice.txId;

    // performing invoice creation
    const inv = await models.invoice.create(invoiceInfo);

    // updating old invoice
    await models.invoice.update(
      { substitutedBy: inv.txId },
      {
        where: {
          txId: oldInvoice.txId,
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
