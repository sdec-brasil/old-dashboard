import login from 'connect-ensure-login';
import passport from 'passport';
import validators from '../../services/invoices/validators';

export default {
  // Retorna uma lista das últimas notas fiscais emitidas
  'GET /invoices': {
    path: 'Invoices.get',
  },
  // Publica uma nota fiscal na Blockchain
  'POST /invoices': {
    path: 'Invoices.post',
    middlewares: [
      passport.authenticate('bearer', { session: false }),
      validators.postInvoice,
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
      passport.authenticate('bearer', { session: false }),
      validators.replaceInvoice,
    ],
  },
};
