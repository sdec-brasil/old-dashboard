import sequelize from 'sequelize';
import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { treatNestedFilters, errors } from '../../utils';


const sqs = require('sequelize-querystring');

const { Op } = models.Sequelize;


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


const getGeneralStats = async (req) => {
  const { month, year } = req.query;
  let dataIncidencia = {};
  if (month && year) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    dataIncidencia = { [Op.between]: [firstDay, lastDay] };
  }
  return models.prefeitura.findByPk(req.params.id,
    {
      raw: true,
      include: [
        {
          model: models.municipio,
          include: [
            models.estado, models.regiao,
          ],
        },
      ],
    })
    .then(async (city) => {
      if (city) {
        const data = {};
        data.city = city;
        const promises = [];

        promises.push(models.invoice.findAll(
          {
            raw: true,
            attributes: [
            // calculate average valLiquiNfse
              [sequelize.fn('AVG', sequelize.col('valLiquiNfse')), 'avgLiquidValue'],
              // calculate number of invoices
              [sequelize.fn('COUNT', sequelize.col('txId')), 'emittedInvoicesCount'],
              // calculate average iss per invoice
              [sequelize.fn('AVG', sequelize.col('valIss')), 'avgIss'],
            ],
            where: {
              prefeituraIncidencia: city.codigoMunicipio,
              dataIncidencia,
            },
          },
        ).then((inv) => {
          data.avgLiquidValue = parseInt(inv[0].avgLiquidValue, 10) || 0;
          data.emittedInvoicesCount = inv[0].emittedInvoicesCount || 0;
          data.avgIss = parseInt(inv[0].avgIss, 10) || 0;
        }));

        // total iss in late invoices
        promises.push(models.invoice.findAll({
          raw: true,
          attributes: [[sequelize.fn('SUM', sequelize.col('valIss')), 'lateIss']],
          where: {
            estado: 1,
            prefeituraIncidencia: city.codigoMunicipio,
            dataIncidencia,
          },
        }).then((inv) => {
          data.lateIssValue = parseInt(inv[0].lateIssValue, 10) || 0;
        }));

        // biggest emissor in values
        promises.push(models.invoice.findAll({
          raw: true,
          attributes: ['enderecoEmissor',
            [sequelize.fn('SUM', sequelize.col('valIss')), 'sumIss'],
          ],
          where: {
            prefeituraIncidencia: city.codigoMunicipio,
            dataIncidencia,
          },
          group: ['enderecoEmissor'],
          order: sequelize.literal('sumIss DESC'),
          limit: 1,
        }).then(async (issuer) => {
          if (issuer.length) {
            const company = await models.empresa.findOne({
              raw: true,
              where: { enderecoBlockchain: issuer[0].enderecoEmissor },
            });
            data.biggestIssuer = {
              cnpj: company.cnpj,
              enderecoBlockchain: company.enderecoBlockchain,
              razaoSocial: company.razaoSocial,
              nomeFantasia: company.nomeFantasia,
            };
          } else {
            data.biggestIssuer = null;
          }
        }));

        return Promise.all(promises).then(() => ({ code: 200, data }));
      }
      throw new errors.NotFoundError('City', `id ${req.params.id}`);
    });
};


const getDailyIssuing = async (req) => {
  const { month, year } = req.query;
  let dataIncidencia = {};
  if (month && year) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    dataIncidencia = { [Op.between]: [firstDay, lastDay] };
  }
  return models.prefeitura.findByPk(req.params.id,
    {
      raw: true,
      include: [
        {
          model: models.municipio,
          include: [
            models.estado, models.regiao,
          ],
        },
      ],
    })
    .then(async (city) => {
      if (city) {
        const data = {};
        data.city = city;
        const promises = [];

        promises.push(models.invoice.findAll(
          {
            raw: true,
            attributes: [
              'dataIncidencia',
              // calculate number of invoices
              [sequelize.fn('COUNT', sequelize.col('txId')), 'emittedInvoicesCount'],
            ],
            group: ['dataIncidencia'],
            where: {
              prefeituraIncidencia: city.codigoMunicipio,
              dataIncidencia,
            },
          },
        ).then((inv) => {
          data.dailyIssuing = inv;
        }));

        return Promise.all(promises).then(() => ({ code: 200, data }));
      }
      throw new errors.NotFoundError('City', `id ${req.params.id}`);
    });
};

export default {
  listCities,
  getCity,
  getGeneralStats,
  getDailyIssuing,
};
