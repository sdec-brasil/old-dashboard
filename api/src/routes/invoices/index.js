import login from 'connect-ensure-login';
import { param, check, body } from 'express-validator/check';
import models from '../../models';

export default {
  // Retorna uma lista das últimas notas fiscais emitidas
  'GET /invoices': {
    path: 'Invoices.get',
  },
  // Publica uma nota fiscal na Blockchain
  'POST /invoices': {
    path: 'Invoices.post',
    middlewares: [
      // login.ensureLoggedIn,
      body('prestacao')
        .exists(),
      body('prestacao.prefeituraIncidencia', 'valor nao valido').isNumeric()
        .isLength({ min: 7, max: 7 })
        .custom(async (value, { req }) => {
          const count = await models.prefeitura.count({
            where: {
              codigoMunicipio: value,
            },
          });
          if (count === 0) {
            throw new Error('prefeitura não encontrada no sistema');
          }
        }),
      body('prestacao.baseCalculo', 'O valor esta incorreto')
        .isInt()
        .custom(async (value, { req }) => {
          const data = req.body;
          let targetValue = parseInt(data.prestacao.valServicos, 10) || 0;
          targetValue -= parseInt(data.prestacao.valDeducoes, 10) || 0;
          targetValue -= parseInt(data.prestacao.descontoIncond, 10) || 0;
          if (parseInt(value, 10) !== targetValue) {
            throw new Error('A base de calculo está errada.');
          }
        }),
      body('prestacao.aliqServicos')
        .isNumeric(),
      body('prestacao.valLiquiNfse')
        .isInt()
        .custom(async (value, { req }) => {
          const data = req.body;
          let targetValue = (parseInt(data.prestacao.valServicos, 10) || 0);
          targetValue -= (parseInt(data.prestacao.valPis, 10) || 0);
          targetValue -= (parseInt(data.prestacao.valCofins, 10) || 0);
          targetValue -= (parseInt(data.prestacao.valInss, 10) || 0);
          targetValue -= (parseInt(data.prestacao.valIr, 10) || 0);
          targetValue -= (parseInt(data.prestacao.valCsll, 10) || 0);
          targetValue -= (parseInt(data.prestacao.outrasRetencoes, 10) || 0);
          targetValue -= (parseInt(data.prestacao.valIss, 10) || 0);
          targetValue -= (parseInt(data.prestacao.descontoIncond, 10) || 0);
          targetValue -= (parseInt(data.prestacao.descontoCond, 10) || 0);
          if (parseInt(value, 10) !== targetValue) {
            throw new Error('ValLiquiNfse está incorreto');
          }
        }),
      body('prestacao.competencia').isInt(),
      body('prestacao.valServicos').isInt(),
      body('prestacao.valDeducoes').isInt(),
      body('prestacao.valPis').isInt(),
      body('prestacao.valCofins').isInt(),
      body('prestacao.valInss').isInt(),
      body('prestacao.valIr').isInt(),
      body('prestacao.valCsll').isInt(),
      body('prestacao.outrasRetencoes').isInt(),
      body('prestacao.valTotalTributos').isInt(),
      body('prestacao.valIss').isInt(),
      body('prestacao.descontoIncond').isInt(),
      body('prestacao.descontoCond').isInt(),
      body('prestacao.issRetido').isBoolean(),
      body('prestacao.respRetencao')
        .custom((value, { req }) => {
          if (req.body.prestacao.issRetido
           && req.body.prestacao.issRetido === true) {
            console.log('bati no 1');
            if (!([1, 2].includes(value))) {
              throw new Error('respRetencao deve ser 1 ou 2 (inteiro)');
            }
          }
        }),
      body('prestacao.itemLista', 'Deve ser uma string de até 5 caracteres')
        .isString().isLength({ max: 5 }),
      body('prestacao.codCnae', 'Deve ser uma string de até 20 caracteres')
        .isString().isLength({ max: 20 }),
      body('prestacao.codServico', 'Deve ser uma string de até 20 caracteres')
        .isString().isLength({ max: 20 }),
      body('prestacao.codNBS', 'Deve ser uma string de até 9 caracteres')
        .isString().isLength({ max: 9 }),
      body('prestacao.discriminacao', 'Deve ser uma string de até 2000 caracteres')
        .isString().isLength({ max: 2000 }),
      body('prestacao.exigibilidadeISS', 'Deve ser um inteiro entre 1 e 7')
        .isInt({ min: 1, max: 7 }),
      body('prestacao.codTributMunicipio')
        .isInt(),
      body('prestacao.numProcesso', 'Deve ser uma string de até 30 caracteres')
        .isString().isLength({ max: 30 }),
      body('prestacao.regimeEspTribut')
        .isInt({ min: 1, max: 6 }),
      body('prestacao.optanteSimplesNacional', 'valor deve ser true ou false')
        .isBoolean(),
      body('prestacao.incentivoFiscal')
        .isBoolean(),
      body('tomador.identificacaoTomador')
        .isString().isLength({ max: 14 }),
      body('tomador.nif')
        .isString().isLength({ max: 40 }),
      body('tomador.nomeRazaoTomador')
        .isString().isLength({ max: 150 }),
      body('tomador.logEnd')
        .isString().isLength({ max: 125 }),
      body('tomador.nif')
        .isString().isLength({ max: 40 }),
      body('tomador.numEnd')
        .isString().isLength({ max: 10 }),
      body('tomador.compEnd')
        .isString().isLength({ max: 60 }),
      body('tomador.bairroEnd')
        .isString().isLength({ max: 60 }),
      body('tomador.cidadeEnd')
        .isInt(),
      body('tomador.estadoEnd')
        .isString().isLength({ max: 2 }),
      body('tomador.paisEnd')
        .isInt(),
      body('tomador.cepEnd')
        .isString().isLength({ max: 8 }),
      body('tomador.email')
        .isString().isEmail(),
      body('tomador.tel')
        .isString().isLength({ max: 20 }),
      body('intermediario.identificacaoIntermed')
        .isString().isLength({ max: 14 }),
      body('intermediario.nomeRazaoIntermed')
        .isString().isLength({ max: 150 }),
      body('intermediario.cidadeIntermed')
        .isInt(),
      body('constCivil.codObra')
        .isString().isLength({ max: 30 }),
      body('constCivil.art')
        .isString().isLength({ max: 30 }),
    ],
  },

  // Pega nota fiscal pelo txid
  'GET /invoices/:txid': {
    path: 'Invoices.getByTxId',
    middlewares: [
    ],
  },

  // Cria uma nova nota fiscal na blockchain que substitui a nota referenciada em txid
  'POST /invoices/:txid': {
    path: 'Invoices.replaceInvoice',
    middlewares: [
      // login.ensureLoggedIn,
    ],
  },
};
