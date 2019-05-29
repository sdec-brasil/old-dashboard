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

export function InvoiceGet(req) {
  const response = new ResponseList(req);

  if (response.err) {
    return {
      code: response.code,
      data: response.value(),
    };
  }

  const { _town, _from } = req.query;

  const pagination = {
    limit: response.limit,
    offset: response.offset,
  };

  if (_town && _from) {
    const from = treatFrom(_from);
  } else if (_town) {
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
