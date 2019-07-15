import sequelize from 'sequelize';
import models from '../../models';
import { errors } from '../../utils';

const getCityStats = async req => models.prefeitura.findByPk(req.params.id,
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
  .then(async (city) => {
    if (city) {
      const data = {};
      data.city = city;
      const promises = [];

      promises.push(models.invoice.findAll(
        {
          attributes: [
            // calculate average valLiquiNfse
            [sequelize.fn('AVG', sequelize.col('valLiquiNfse')), 'avgLiquidValue'],
            // calculate number of invoices
            [sequelize.fn('COUNT', sequelize.col('txId')), 'emitedInvoicesCount'],
            // calculate average iss per invoice
            [sequelize.fn('AVG', sequelize.col('valIss')), 'avgIss'],
          ],
          where: {
            prefeituraIncidencia: city.dataValues.codigoMunicipio,
          },
        },
      ).then((inv) => {
        data.avgLiquidValue = parseInt(inv[0].dataValues.avgLiquidValue, 10);
        data.emitedInvoicesCount = inv[0].dataValues.emitedInvoicesCount;
        data.avgIss = parseInt(inv[0].dataValues.avgIss, 10);
      }));

      return Promise.all(promises).then(() => ({ code: 200, data }));
    }
    throw new errors.NotFoundError('City', `id ${req.params.id}`);
  });


export default {
  getCityStats,
};
