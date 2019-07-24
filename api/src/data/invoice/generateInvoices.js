import uuid from 'uuid/v4';
import models from '../../models';


let prefeiturasCod = [];
let empresasEnd = [];


// auxiliary functions -----------------
function randint(limit) {
  return Math.floor(Math.random() * 10000) % limit;
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// field generator functions --------------------

function txId() {
  return uuid();
}

// function substitutes() {
// }

// substitutedBy {
// }

// function blocoConfirmacao() {
//   return uuid();
// }

// function dataBlocoConfirmacao() {
//   return new Date(Date.now() - randint(50) * 10000000);
// }

// ----- Campos da Prestação:
function baseCalculo() {
  return randint(1000000);
}

function aliqServicos() {
  return randint(5000);
}

function valLiquiNfse() {
  return randint(5000);
}

function dataIncidencia() {
  return new Date(Date.now() - randint(50) * 100000000);
}

function valServicos() {
  return randint(1000000);
}

function valDeducoes() {
  return randint(9999);
}

function valPis() {
  return randint(999);
}

function valCofins() {
  return randint(999);
}

function valInss() {
  return randint(999);
}

function valIr() {
  return randint(999);
}

function valCsll() {
  return randint(999);
}

function outrasRetencoes() {
  return randint(999);
}

function valTotalTributos() {
  return randint(50000);
}

function valIss() {
  return randint(999);
}

function descontoIncond() {
  return randint(50);
}

function descontoCond() {
  return randint(50);
}

function issRetido() {
  return choice([false, true]);
}

function respRetencao() {
  // Informado somente se IssRetido igual a "true".
  // A opção “2 – Intermediário” somente poderá ser selecionada
  // se “CpfCnpjIntermediario” informado.
  //       * `1` - Tomador
  //       * `2` - Intermediário
  return choice([1, 2]);
}

function itemLista() {
  return choice(['4.23', '4.06', '4.07']);
}

function codCnae() {
  return randint(500);
}

function codServico() {
  return uuid().slice(0, 20);
}

function codNBS() {
  return uuid().slice(0, 9);
}

function discriminacao() {
  return uuid();
}

function exigibilidadeISS() {
  // * `1` - Exigível
  // * `2` - Não incidência
  // * `3` - Isenção
  // * `4` - Exportação
  // * `5` - Imunidade
  // * `6` - Exigibilidade Suspensa por Decisão Judicial
  // * `7` - Exigibilidade Suspensa por Processo Administrativo
  return choice([1, 2, 3, 4, 5, 6, 7]);
}

function numProcesso() {
  return uuid().slice(0, 30);
}

function regimeEspTribut() {
  // * `1` – Microempresa Municipal
  // * `2` – Estimativa
  // * `3` – Sociedade de Profissionais
  // * `4` – Cooperativa
  // * `5` – Microempresário Individual (MEI)
  // * `6` – Microempresário e Empresa de Pequeno Porte (ME EPP).
  return choice([1, 2, 3, 4, 5, 6]);
}

function optanteSimplesNacional() {
  return choice([false, true]);
}

function incentivoFiscal() {
  return choice([false, true]);
}

// ----- Campos do Tomador:
function identificacaoTomador() {
  return uuid().slice(0, 10);
}

function nif() {
  return uuid().slice(0, 30);
}

function nomeRazaoTomador() {
  return uuid();
}

function logEnd() {
  return uuid();
}

function numEnd() {
  return uuid().slice(0, 10);
}

function compEnd() {
  return uuid().slice(0, 60);
}

function bairroEnd() {
  return uuid().slice(0, 60);
}

function cidadeEnd() {
  return randint(500);
}

function estadoEnd() {
  return uuid().slice(0, 2);
}

function paisEnd() {
  return randint(9999);
}

function cepEnd() {
  return uuid().slice(0, 8);
}

function email() {
  return `${uuid().slice(0, 15)}@xxxx.xx`;
}

function tel() {
  return uuid().slice(0, 20);
}

// ----- Campos do Intermediário:
function identificacaoIntermed() {
  return uuid().slice(0, 14);
}

function nomeRazaoIntermed() {
  return uuid();
}

function cidadeIntermed() {
  return randint(9999);
}

// ----- Campos da Construção Civil:
function codObra() {
  return uuid().slice(0, 30);
}

function art() {
  return uuid().slice(0, 30);
}

//
// ----- Campos que não estão na documentação:
function estado() {
  // 0 - pendente,
  // 1 - atrasado,
  // 2 - pago,
  // 3 - substituida,
  // 4 - dados inconsistentes
  return choice([0, 1, 2, 3, 4]);
}

function prefeituraIncidencia() {
  if (prefeiturasCod.length === 0) {
    throw new Error('!! Error !! no registered prefeituras found while creating invoices.');
  }
  return choice(prefeiturasCod);
}

function enderecoEmissor() {
  if (empresasEnd.length === 0) {
    throw new Error('!! Error !! no registered empresas found while creating invoices.');
  }
  return choice(empresasEnd);
}

const generator = {
  txId,
  baseCalculo,
  valLiquiNfse,
  dataIncidencia,
  valServicos,
  valDeducoes,
  valPis,
  valCofins,
  valInss,
  valIr,
  valCsll,
  outrasRetencoes,
  valTotalTributos,
  valIss,
  aliqServicos,
  descontoIncond,
  descontoCond,
  issRetido,
  respRetencao,
  itemLista,
  codCnae,
  codServico,
  codNBS,
  discriminacao,
  exigibilidadeISS,
  numProcesso,
  regimeEspTribut,
  optanteSimplesNacional,
  incentivoFiscal,
  identificacaoTomador,
  nif,
  nomeRazaoTomador,
  logEnd,
  numEnd,
  compEnd,
  bairroEnd,
  cidadeEnd,
  estadoEnd,
  paisEnd,
  cepEnd,
  email,
  tel,
  identificacaoIntermed,
  nomeRazaoIntermed,
  cidadeIntermed,
  codObra,
  art,
  estado,
  prefeituraIncidencia,
  enderecoEmissor,
};

function newInvoice() {
  const invoice = {};
  Object.keys(generator).forEach((key) => {
    invoice[key] = generator[key]();
  });
  return invoice;
}


async function generateInvoices(n) {
  return new Promise(async (resolve) => {
    console.log(`SETUP - Generating ${n} invoices...`);

    const prefeituras = await models.prefeitura.findAll();
    prefeiturasCod = prefeituras.map(x => x.codigoMunicipio);
    const empresas = await models.empresa.findAll();
    empresasEnd = empresas.map(x => x.enderecoBlockchain);

    const invoices = [];
    for (let i = 0; i < n; i += 1) {
      invoices.push(newInvoice());
    }
    await models.invoice.bulkCreate(invoices);
    console.log('SETUP - Done populating invoices.');
    resolve(true);
  });
}

export default generateInvoices;
