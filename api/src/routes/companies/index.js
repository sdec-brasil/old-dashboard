import login from 'connect-ensure-login';

export default {
  // Retorna uma lista de Companies
  'GET /companies': 'Companies.get',

  // Cria uma nova Company na Blockchain
  'POST /companies': {
    path: 'Companies.post',
    middlewares: [
    ],
  },

  // Retorna informações da Company
  'GET /companies/:id': 'Companies.getById',

  // Atualiza o modelo do usuário na Blockchain
  // 'POST /companies/:id': {
  //   path: 'Companies.update',
  //   middlewares: [
  //     login.ensureLoggedIn,
  //   ],
  // },
};
