import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { treatNestedFilters, errors } from '../../utils';

const sqs = require('sequelize-querystring');

const listCompanies = async (req) => {
  const sq = sqs.withSymbolicOps(models.Sequelize, {});
  const filter = req.query.filter ? req.query.filter : '';

  // TODO: for this to work, the empresa model needs a key to the block it was registered on
  // if (!filter.includes('block.block_datetime')) {
  //   if (filter.length === 0) {
  //     filter += `block.block_datetime lte ${((new Date()).toISOString())}`;
  //   } else {
  //     filter += `, block.block_datetime lte ${((new Date()).toISOString())}`;
  //   }
  // }
  let where = null;
  try {
    where = sq.find(filter);
  } catch (err) {
    throw new errors.BadFilterError();
  }
  treatNestedFilters(filter, where);

  return models.empresa.findAndCountAll({
    offset: parseInt(req.query.offset, 10) || 0,
    limit: parseInt(req.query.limit, 10) || limitSettings.invoice.get,
    where,
    order: req.query.sort ? sq.sort(req.query.sort) : [],
  }).then((results) => {
    const response = new ResponseList(req, results, filter);
    return { code: 200, data: response.value() };
  }).catch((err) => {
    throw err;
  });
};

const getCompany = async req =>
  // search by cnpj
  models.empresa.findByPk(req.params.id)
    .then((companyByCnpj) => {
      if (companyByCnpj) {
        return { code: 200, data: companyByCnpj };
      }
      // search by public address
      return models.empresa.findOne({
        where: { enderecoBlockchain: req.params.id },
      })
        .then((companyByAddress) => {
          if (companyByAddress) {
            return { code: 200, data: companyByAddress };
          }
          throw new errors.NotFoundError('Company', `CNPJ or blockchainAddress ${req.params.id}`);
        });
    });


const postCompany = async (req) => {
// search by cnpj
  const companyInfo = req.body;


  invoiceInfo.enderecoEmissor = empresa.enderecoBlockchain;

  const lastBlock = await models.block.findOne({ raw: true });
  invoiceInfo.blocoConfirmacaoId = lastBlock.block_id;

  const inv = await models.invoice.create(invoiceInfo);
  return { code: 201, data: serializers.invoice.serialize(inv) };
};


async function register(stream) {
  try {
    const address = await this.node.getNewAddress();
    this.json.endBlock = address;
    const tx = await this.node.grant([address, 'send,receive', 0]);

    setTimeout(async () => {
      try {
        await this.node.publishFrom([address, stream, ['COMPANY_REGISTRY', this.json.cnpj], { json: this.json }]);
        this.registered = true;
        console.log(`Empresa ${address} Registrada com ${tx}`);
      } catch (e) {
        console.log('Error ao registrar empresa:');
        console.error(e);
      }
    }, 30000);
  } catch (e) {
    console.log('Error ao gerar endereço e permitir empresa:');
    console.error(e);
  }
}


export default {
  listCompanies,
  getCompany,
  postCompany,
};
