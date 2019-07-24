import sequelize from 'sequelize';
import { utils } from 'mocha';
import ResponseList from '../../utils/response';
import { limitSettings } from '../../config/config';
import models from '../../models';
import {
  serializers, treatNestedFilters, customErr, errors,
} from '../../utils';
import lc116 from './lc166';

const { Op } = models.Sequelize;

function defineReceiver(x) {
  const tomador = [];
  const provedor = [];
  while (x.length) {
    const element = x.shift();
    // console.log(lc116);
    console.log(String(element.itemLista));
    console.log(lc116['4.07']);
    if (lc116[String(element.itemLista)].incidenciaTomador) {
      tomador.push(element);
      console.log(1);
    } else {
      provedor.push(element);
    }
  }
  return [tomador, provedor];
}


const listSettlements = async (req) => {

};

const getSettlementsToCity = async (req) => {

};

const getSettlementsFromCompany = async (req) => {
  const { cnpj } = req.params;
  const { month, year } = req.query;

  const company = await models.empresa.findByPk(cnpj, { raw: true });
  if (company == null) {
    return { code: 404, data: { error: 'company not found' } };
  }

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const dataIncidencia = { [Op.between]: [firstDay, lastDay] };


  const invoices = await models.invoice.findAll({
    raw: true,
    where: {
      enderecoEmissor: company.enderecoBlockchain,
      dataIncidencia,
    },
  });

  const [tomador, provedor] = defineReceiver(invoices);

  const settlementValues = {};

  let totalProvedor = 0;
  // invoices para o provedor
  if (provedor.length) {
    const prefeituraProvedor = await models.prefeitura.findByPk(company.cidadeEndereco);
    if (prefeituraProvedor === null) {
      throw new errors.NotFoundError();
    }
    totalProvedor = provedor.reduce((x, y) => x + y.valIss, 0);
    settlementValues[prefeituraProvedor.codigoMunicipio] = totalProvedor;
  }
  // invoices para o tomador
  if (tomador.length) {
    tomador.forEach((inv) => {
      if (settlementValues[inv.prefeituraIncidencia] !== undefined) {
        settlementValues[inv.prefeituraIncidencia] += inv.valIss;
      } else {
        settlementValues[inv.prefeituraIncidencia] = inv.valIss;
      }
    });
  }

  return { code: 200, data: { settlementValues } };
  // if not invoices return [] ???


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
};


export default {
  listSettlements,
  getSettlementsToCity,
  getSettlementsFromCompany,
};
