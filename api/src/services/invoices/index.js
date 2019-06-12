import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import formatters from '../../utils/formatters';
import validate from '../../utils/validate';
import models from '../../models';
import { serializers } from '../../utils';

const sqs = require('sequelize-querystring');

export async function InvoiceGet(req) {
  return new Promise(async (resolve) => {
    // const listView = new ListFilterSet();
    // listView.setModel(models.invoice);
    // listView.setFilterFields([
    //   'issRetido',
    //   'respRetencao',
    //   'emissor',
    //   'emissor__cnpj',
    //   'emissor__enderecoBlockchain',
    //   'prefeitura__codigoMunicipio',
    //   'prefeitura__cnpj',
    //   'dataBlocoConfirmacao',
    //   'dataBlocoConfirmacao_to',
    //   'dataBlocoConfirmacao_from',
    // ]);
    // listView.buildQuery(req);
    // // TODO: obs. serializers.invoice() might be a problem if the limit querystring
    // // is too high.
    // listView.executeQuery().then((queryResult) => {
    //   const formattedQueryResult = {};
    //   // now we serialize the invoices so the structure defined in the docs
    //   formattedQueryResult.rows = queryResult.rows.map(inv => serializers.invoice(inv));
    //   formattedQueryResult.count = queryResult.count;
    //   // we pass the data and counts to the response handler
    //   const response = new ResponseList(req, formattedQueryResult);
    //   resolve({ code: 200, data: response.value() });
    // const sq = sqs(models.Sequelize, { symbolic: true });
    const sq = sqs.withSymbolicOps(models.Sequelize, {});
    models.invoice.findAndCountAll({
      offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || limitSettings.invoice.get,
      where: req.query.filter ? sq.find(req.query.filter) : {},
      order: req.query.sort ? sq.sort(req.query.sort) : [],

      // This should be uncommented after transforming blocoConfirmacao
      // in a foreignkey to block.
      // attributes: {
      //   include: [[models.Sequelize.literal('block.block_nDatetime'), 'dataBlocoConfirmacao'],
      //     [models.Sequelize.literal('block.block_hash'), 'blocoConfirmacao']],
      // },
      // include: [{ model: models.block, as: 'block', attributes: [] }],
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
