const serializers = Object.create(null);

serializers.invoice = {};

serializers.invoice.serialize = (inv) => {
  const invoice = JSON.parse(JSON.stringify(inv));
  const invoiceStructure = {
    prestacao: [
      'prefeituraIncidencia',
      'competencia',
      'baseCalculo',
      'aliqServicos',
      'codServico',
      'valIss',
      'valLiquiNfse',
      'valServicos',
      'valDeducoes',
      'issRetido',
      'itemLista',
      'discriminacao',
      'exigibilidadeISS',
      'simplesNacional',
      'incentivoFiscal',
      'respRetencao',
      'valPis',
      'valCofins',
      'valInss',
      'valIr',
      'valCsll',
      'outrasRetencoes',
      'valTotalTributos',
      'descontoIncond',
      'descontoCond',
      'codCnae',
      'codNBS',
      'numProcesso',
      'regimeEspTribut',
      'optanteSimplesNacional',
    ],
    tomador: [
      'identificacaoTomador',
      'nif',
      'nomeRazaoTomador',
      'logEnd',
      'numEnd',
      'compEnd',
      'bairroEnd',
      'cidadeEnd',
      'estadoEnd',
      'paisEnd',
      'cepEnd',
      'email',
      'tel',
    ],
    intermediario: [
      'identificacaoIntermed',
      'nomeRazaoIntermed',
      'cidadeIntermed',
    ],
    constCivil: [
      'codObra',
      'art',
    ],
  };
  Object.keys(invoiceStructure).forEach((category) => {
    invoiceStructure[category].forEach((field) => {
      if (invoice[field] !== undefined) {
        if (invoice[category] === undefined) {
          invoice[category] = {};
        }
        invoice[category][field] = invoice[field];
        delete invoice[field];
      }
    });
  });
  return invoice;
};

serializers.invoice.deserialize = (inv) => {
  const newInv = {};
  Object.keys(inv).forEach((key) => {
    if (typeof (inv[key]) === 'object') {
      Object.keys(inv[key]).forEach((field) => {
        newInv[field] = inv[key][field];
      });
    } else {
      newInv[key] = inv[key];
    }
  });
  return newInv;
};

export default serializers;
