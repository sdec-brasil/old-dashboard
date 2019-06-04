import login from 'connect-ensure-login';

const routes = {
  // Retorna uma lista de usuários
  'GET /users': 'Users.get',

  // Cria um novo usuário na Blockchain
  'POST /users': {
    path: 'Users.post',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },

  // Pega usuário pelo ID
  'GET /users/:id': 'Users.getById',

  // Atualiza o modelo do usuário na Blockchain
  'POST /users/:id': {
    path: 'User.updateUser',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },
};
