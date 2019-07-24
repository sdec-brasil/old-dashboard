import login from 'connect-ensure-login';

export default {
  // Retorna uma lista das últimas notas de pagamentos emitidas pelo sistema
  'GET /settlement': 'Settlement.get',

  // Cria uma nova Nota de Pagamento na Blockchain
  'POST /settlement': {
    path: 'Settlement.post',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },

  // Retorna informações de notas de pagamento
  // de um determinado municipio pelo código IBGE
  'GET /settlement/city/:ibge': 'Settlement.getSettlementsToCity',

  // Retorna informações de notas de pagamento
  // de um determinado municipio pelo CNPJ
  'GET /settlement/company/:cnpj': {
    path: 'Settlement.getSettlementsFromCompany',
    middlewares: [
    ],
  },

  // Mudar status da nota de pagamento (cancelar?)
};
