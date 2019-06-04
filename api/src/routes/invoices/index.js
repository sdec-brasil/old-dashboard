import login from 'connect-ensure-login';

const routes = {
  // Retorna uma lista das últimas notas fiscais emitidas
  'GET /invoices': 'Invoices.get',

  // Publica uma nota fiscal na Blockchain
  'POST /invoices': {
    path: 'Invoices.post',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },

  // Pega nota fiscal pelo txid
  'GET /invoices/:txid': 'Invoices.getByTxid',

  // Cria uma nova nota fiscal na blockchain que substitui a nota referenciada em txid
  'POST /invoices/:txid': {
    path: 'Invoices.replaceInvoice',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },
};
