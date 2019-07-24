import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import { serializers, treatNestedFilters, customErr } from '../../utils';

const lc116 = require('./lc166');

const listSettlements = async (req) => {

};

const getSettlementsToCity = async (req) => {

};

const getSettlementsFromCompany = async (req) => {
  const { cnpj } = req.params;
  const company = await models.empresa.findByPk(cnpj, { raw: true });
  if (company == null) {
    return { code: 404, data: { error: 'company not found' } };
  }
  
  // pegar todas as invoices do mes

  // pra cada invoice, ver o tipo de serviço e separar em "tomador" ou "prestador"

  // para o array de prestador:
    // pegar cidade sede da empresa

    // pra cada invoice:
      // pegar a aliquota do lc116 com a prefeitura do prestador,
      //  e calcular o imposto devido sobre essa invoice
    
    // somar os impostos devidos
    
  
  // para o array de tomador

    // agrupar invoices por cidadeEnd (cidade  do tomador),
    // somando o faturamento de cada cidade

    // pegar aliquotas de cada cidade agrupada acima
    // calcular os impostos para cada cidade


    // identificar o regime tributario da empresa
    // ???????

    // ????? conferir data de pagamento do imposto (por prefeitura) e criar um settlement ????

  // somar os valores devidos dos dois arrays, agrupados por cidade.
  // criar o  settlement.
  // criar os settlementValues para cada (cidade, valor), que apontem para o settlement
  }

  return { code: 200, data: company };
};


export default {
  listSettlements,
  getSettlementsToCity,
  getSettlementsFromCompany,
};
