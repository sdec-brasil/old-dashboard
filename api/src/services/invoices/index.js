import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import formatters from '../../utils/formatters';
import validate from '../../utils/validate';
import models from '../../models';
import { ListFilterSet, serializers } from '../../utils';

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
        field: 'from',
        data: formatters.CNPJ(param),
        type: 'CNPJ',
      };
    }
    return {
      err: 400,
      field: 'from',
      where: 'CNPJ',
    };
  } if (tam.length === 14) {
    if (validate.CPF(param)) {
      return {
        err: null,
        field: 'from',
        data: formatters.CPF(param),
        type: 'CPF',
      };
    } if (validate.CNPJ(param)) {
      return {
        err: null,
        field: 'from',
        data: formatters.CNPJ(param),
        type: 'CNPJ',
      };
    }
    return {
      err: 400,
      field: 'from',
      where: 'CPF/CNPJ',
    };
  } if (tam.length === 11) {
    if (validate.CPF(param)) {
      return {
        err: null,
        field: 'from',
        data: formatters.CPF(param),
        type: 'CPF',
      };
    }
    return {
      err: 400,
      field: 'from',
      where: 'CPF',
    };
    // possível GUID nao formatado
  } if (tam.length === 36) {
    if (validate.GUID(param)) {
      return {
        err: null,
        data: param,
        field: 'from',
        type: 'GUID',
      };
    }
    return {
      err: 400,
      field: 'from',
      where: 'GUID',
    };
  } if (tam.length > 25 || tam.length < 36) {
    if (validate.Address(param)) {
    // possível endereço da blockchain?
      return {
        err: null,
        data: param,
        field: 'from',
        type: 'publicAddress',
      };
    }
    return {
      err: 400,
      field: 'from',
      where: 'publicAddress',
    };
  }
  return {
    err: 400,
    field: 'from',
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
          field: 'town',
          data: Number(town),
        };
      }
      return {
        err: 400,
        field: 'town',
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
            field: 'town',
            data: formatters.CNPJ(town),
          };
        }
        return {
          err: 400,
          field: 'town',
          where: 'IBGE',
        };
      } catch (e) {
        throw new Error(`??????124?????? ${e}`);
      }
    }
    return {
      err: 400,
      field: 'town',
      where: 'CNPJ',
    };
  }
  return {
    err: 400,
    field: 'town',
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
    if (filter.type === 'CNPJ') {
      if (filter.field === 'from') {
        options.where.emissor = {
          cnpj: filter.data,
        };
      } else if (filter.field === 'town') {
        options.where.prefeitura_incidencia = {
          cnpj: filter.data,
        };
      }
    } else if (filter.type === 'CPF') {
      // só pode ser from
      throw new Error('Endpoint não implementado - Faz sentido?');
    } else if (filter.type === 'GUID') {
      // só pode ser from
      throw new Error('Endpoint não implementado - Faz sentido?');
    } else if (filter.type === 'publicAddress') {
      options.where.emissor = filter.data;
    } else if (filter.type === 'IBGE') {
      options.where.prefeitura_incidencia = filter.data;
    }
  }
}

export async function InvoiceGet(req) {
  return new Promise(async (resolve) => {
    const listView = new ListFilterSet();
    listView.setModel(models.invoice);
    listView.setFilterFields([
      'issRetido',
      'respRetencao',
      'emissor',
      'emissor__cnpj',
      'emissor__enderecoBlockchain',
      'prefeitura__codigoMunicipio',
      'prefeitura__cnpj',
      'dataBlocoConfirmacao',
      'dataBlocoConfirmacao_to',
      'dataBlocoConfirmacao_from',
    ]);
    listView.buildQuery(req);
    // TODO: obs. serializers.invoice() might be a problem if the limit querystring
    // is too high.
    listView.executeQuery().then((queryResult) => {
      const formattedQueryResult = {};
      // now we serialize the invoices so the structure defined in the docs
      formattedQueryResult.rows = queryResult.rows.map(inv => serializers.invoice(inv));
      formattedQueryResult.count = queryResult.count;
      // we pass the data and counts to the response handler
      const response = new ResponseList(req, formattedQueryResult);
      resolve({ code: 200, data: response.value() });
    }).catch((err) => {
      resolve({ code: 500, data: err.message });
      throw err;
    });
  });

  // if (response.err) {
  //   return {
  //     code: response.code,
  //     data: response.value(),
  //   };
  // }

  // const { _town, _from } = req.query;

  // const pagination = {
  //   limit: response.cursor.limit,
  //   offset: response.cursor.offset,
  //   until: response.cursor.until,
  // };

  // if (_town && _from) {
  //   const from = treatFrom(_from);
  //   const town = await treatTown(_town);

  //   if (town.err === undefined && from.err === undefined) {
  //     const options = constructOptions([pagination, town, from]);
  //   }

  //   // what if there's an error?
  // } if (_town) {
  //   // stop
  // } else if (_from) {
  //   const from = treatFrom(_from);

  //   if (from.err) {
  //     response.constructError({ field: 'from', code: from.err, where: from.where });
  //     return {
  //       code: response.code,
  //       data: response.value(),
  //     };
  //   }


  //   if (from.type === 'CNPJ') {
  //     models.invoice.findAll({
  //       where: {

  //       },
  //       pagination,
  //     });
  //   }
  // } else {
  //   // stop
  // }
}

export const lintFixer = 5;
