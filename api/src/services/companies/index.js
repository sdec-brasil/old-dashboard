import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { treatNestedFilters, errors, chain } from '../../utils';

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
  const companyInfo = {
    cnpj: req.body.cnpj,
    razao: req.body.razaoSocial,
    fantasia: req.body.nomeFantasia,
    logEnd: req.body.enderecoEmpresa,
    numEnd: req.body.numeroEndereco,
    compEnd: req.body.complementoEndereco,
    bairroEnd: req.body.bairroEndereco,
    cidadeEnd: req.body.cidadeEndereco,
    estadoEnd: req.body.unidadeFederacao,
    paisEnd: req.body.paisEndereco,
    cepEnd: req.body.cep,
    email: req.body.email,
    tel: req.body.telefone,
  };
  chain.registerEnterprise(companyInfo);
  return { code: 201, data: 'created' };
};


export default {
  listCompanies,
  getCompany,
  postCompany,
};
