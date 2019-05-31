import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import formatters from '../../utils/formatters';
import validate from '../../utils/validate';
import models from '../../models';

/**
 * Tries to identify which type param belongs to and format it for our service
 * @param   {String} param - CNPJ || CPF || GUID || Address
 * @returns {Object} { return.err, (return.where) } || { return.data, return.type }
 */
function treatFrom(param) {
  const tam = param.length;

  if (tam.length === 18) {
    if (validate.CNPJ(param)) {
      return {
        err: null,
        data: formatters.CNPJ(param),
        type: 'CNPJ',
      };
    }
    return {
      err: 400,
      where: 'CNPJ',
    };
  } if (tam.length === 14) {
    if (validate.CPF(param)) {
      return {
        err: null,
        data: formatters.CPF(param),
        type: 'CPF',
      };
    } if (validate.CNPJ(param)) {
      return {
        err: null,
        data: formatters.CNPJ(param),
        type: 'CNPJ',
      };
    }
    return {
      err: 400,
      where: 'CPF/CNPJ',
    };
  } if (tam.length === 11) {
    if (validate.CPF(param)) {
      return {
        err: null,
        data: formatters.CPF(param),
        type: 'CPF',
      };
    }
    return {
      err: 400,
      where: 'CPF',
    };
    // possível GUID nao formatado
  } if (tam.length === 36) {
    if (validate.GUID(param)) {
      return {
        err: null,
        data: param,
        type: 'GUID',
      };
    }
    return {
      err: 400,
      where: 'GUID',
    };
  } if (tam.length > 25 || tam.length < 36) {
    if (validate.Address(param)) {
    // possível endereço da blockchain?
      return {
        err: null,
        data: param,
        type: 'publicAddress',
      };
    }
    return {
      err: 400,
      where: 'publicAddress',
    };
  }
  return {
    err: 400,
    where: null,
  };
}

/**
 * Tries to identify which type param belongs to and format it for our service
 * @param   {String} param - CNPJ || COD-IBGE
 * @returns {Object} { return.err, (return.where) } || { return.data, return.type }
 */
async function treatTown(town) {
  if (town.length === 7 && Number.isInteger(Number(town))) {
    try {
      const queriedTown = await models.prefeitura.findOne({
        where: {
          codigo_municipio: Number(town),
        },
        raw: true,
      });
      if (queriedTown) {
        return {
          type: 'IBGE',
          data: Number(town),
        };
      }
      return {
        err: 400,
        where: 'IBGE',
      };
    } catch (e) {
      throw new Error(`??????123?????? ${e}`);
    }
  } if (town.length === 18 || town.length === 14) {
    if (validate.CNPJ(town)) {
      try {
        const queriedTown = await models.prefeitura.findOne({
          where: {
            cnpj: formatters.CNPJ(town),
          },
          raw: true,
        });

        if (queriedTown) {
          return {
            type: 'CNPJ',
            data: formatters.CNPJ(town),
          };
        }
        return {
          err: 400,
          where: 'IBGE',
        };
      } catch (e) {
        throw new Error(`??????124?????? ${e}`);
      }
    }
    return {
      err: 400,
      where: 'CNPJ',
    };
  }
  return {
    err: 400,
    where: null,
  };
}

/**
 * Construct options parameters used on Sequelize
 * @param   {String} args - Array of args
 * @returns {Object} "Options" parameter for sequelize
 */
function constructOptions(args) {
  if (args.length < 1) {
    throw new Error('errooou');
  }

  const options = Object.create(null);
  options.raw = true;
  options.ord = '"dataBlocoConfirmacao" DESC';
  options.offset = args[0].offset;
  options.limit = args[0].limit;

  options.where = Object.create(null);
  options.where.dataBlocoConfirmacao = {
    [models.Sequelize.Op.lte]: args[0].until,
  };

  for (let i = 1; i < args.length - 1; i += 1) {
    const filter = args[i];
  }
}

export async function InvoiceGet(req) {
  const response = new ResponseList(req);

  if (response.err) {
    return {
      code: response.code,
      data: response.value(),
    };
  }

  const { _town, _from } = req.query;

  const pagination = {
    limit: response.cursor.limit,
    offset: response.cursor.offset,
    until: response.cursor.until,
  };

  if (_town && _from) {
    const from = treatFrom(_from);
    const town = await treatTown(_town);

    if (town.err === undefined && from.err === undefined) {
      const options = constructOptions([pagination, town, from]);
    }

    // what if there's an error?
  } if (_town) {
    // stop
  } else if (_from) {
    const from = treatFrom(_from);

    if (from.err) {
      response.constructError({ field: 'from', code: from.err, where: from.where });
      return {
        code: response.code,
        data: response.value(),
      };
    }


    if (from.type === 'CNPJ') {
      models.invoice.findAll({
        where: {

        },
        pagination,
      });
    }
  } else {
    // stop
  }
}

export const lintFixer = 5;
