import sequelize from 'sequelize';
import models from '../../models';
import { errors } from '../../utils';

const getCityStats = async req => models.prefeitura.findByPk(req.params.id,
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
            [sequelize.fn('COUNT', sequelize.col('txId')), 'emitedInvoicesCount'],
            // calculate average iss per invoice
            [sequelize.fn('AVG', sequelize.col('valIss')), 'avgIss'],
          ],
          where: {
            prefeituraIncidencia: city.codigoMunicipio,
          },
        },
      ).then((inv) => {
        data.avgLiquidValue = parseInt(inv[0].avgLiquidValue, 10);
        data.emitedInvoicesCount = inv[0].emitedInvoicesCount;
        data.avgIss = parseInt(inv[0].avgIss, 10);
      }));

      // total iss in late invoices
      promises.push(models.invoice.findAll({
        raw: true,
        attributes: [[sequelize.fn('SUM', sequelize.col('valIss')), 'lateIss']],
        where: {
          estado: 1,
          prefeituraIncidencia: city.codigoMunicipio,
        },
      }).then((inv) => {
        data.lateIssValue = parseInt(inv[0].lateIssValue, 10);
      }));

      // total iss in pending invoices
      promises.push(models.invoice.findAll({
        raw: true,
        attributes: [[sequelize.fn('SUM', sequelize.col('valIss')), 'lateIss']],
        where: {
          estado: 1,
          prefeituraIncidencia: city.codigoMunicipio,
        },
      }).then((inv) => {
        data.lateIssValue = parseInt(inv[0].lateIssValue, 10);
      }));
      return Promise.all(promises).then(() => ({ code: 200, data }));
    }
    throw new errors.NotFoundError('City', `id ${req.params.id}`);
  });


export default {
  getCityStats,
};
