import { param, check, body } from 'express-validator/check';
import models from '../../models';

const validators = {};
validators.postInvoice = [
  body('substitutes').not().exists(),
  body('substitutedBy').not().exists(),
  body('enderecoEmissor').not().exists(),
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
  body('prestacao.valDeducoes').isInt().optional(),
  body('prestacao.valPis').isInt().optional(),
  body('prestacao.valCofins').isInt().optional(),
  body('prestacao.valInss').isInt().optional(),
  body('prestacao.valIr').isInt().optional(),
  body('prestacao.valCsll').isInt().optional(),
  body('prestacao.outrasRetencoes').isInt().optional(),
  body('prestacao.valTotalTributos').isInt().optional(),
  body('prestacao.valIss').isInt(),
  body('prestacao.descontoIncond').isInt().optional(),
  body('prestacao.descontoCond').isInt().optional(),
  body('prestacao.issRetido').isBoolean(),
  body('prestacao.respRetencao')
    .isInt({ min: 1, max: 2 })
    .optional(),
  body('prestacao.itemLista', 'Deve ser uma string de até 5 caracteres')
    .isString().isLength({ max: 5 }),
  body('prestacao.codCnae', 'Deve ser uma string de até 20 caracteres')
    .isString().isLength({ max: 20 }).optional(),
  body('prestacao.codServico', 'Deve ser uma string de até 20 caracteres')
    .isString().isLength({ max: 20 }).optional(),
  body('prestacao.codNBS', 'Deve ser uma string de até 9 caracteres')
    .isString().isLength({ max: 9 }).optional(),
  body('prestacao.discriminacao', 'Deve ser uma string de até 2000 caracteres')
    .isString().isLength({ max: 2000 }),
  body('prestacao.exigibilidadeISS', 'Deve ser um inteiro entre 1 e 7')
    .isInt({ min: 1, max: 7 }),
  body('prestacao.numProcesso', 'Deve ser uma string de até 30 caracteres')
    .isString().isLength({ max: 30 }).optional(),
  body('prestacao.regimeEspTribut')
    .isInt({ min: 1, max: 6 }).optional(),
  body('prestacao.optanteSimplesNacional', 'valor deve ser true ou false')
    .isBoolean(),
  body('prestacao.incentivoFiscal')
    .isBoolean(),
  body('tomador.identificacaoTomador')
    .isString().isLength({ max: 14 }).optional(),
  body('tomador.nif')
    .isString().isLength({ max: 40 }).optional(),
  body('tomador.nomeRazaoTomador')
    .isString().isLength({ max: 150 }).optional(),
  body('tomador.logEnd')
    .isString().isLength({ max: 125 }).optional(),
  body('tomador.nif')
    .isString().isLength({ max: 40 }).optional(),
  body('tomador.numEnd')
    .isString().isLength({ max: 10 })
    .optional(),
  body('tomador.compEnd').optional()
    .isString().isLength({ max: 60 })
    .optional(),
  body('tomador.bairroEnd')
    .isString().isLength({ max: 60 }).optional(),
  body('tomador.cidadeEnd')
    .isInt().optional(),
  body('tomador.estadoEnd')
    .isString().isLength({ max: 2 }).optional(),
  body('tomador.paisEnd')
    .isInt().optional(),
  body('tomador.cepEnd')
    .isString().isLength({ max: 8 }).optional(),
  body('tomador.email')
    .isString().isEmail().optional(),
  body('tomador.tel')
    .isString().isLength({ max: 20 }).optional(),
  body('intermediario.identificacaoIntermed')
    .isString().isLength({ max: 14 }).optional(),
  body('intermediario.nomeRazaoIntermed')
    .isString().isLength({ max: 150 }).optional(),
  body('intermediario.cidadeIntermed')
    .isInt().optional(),
  body('constCivil.codObra')
    .isString().isLength({ max: 30 }).optional(),
  body('constCivil.art')
    .isString().isLength({ max: 30 }).optional(),
];

export default validators;
