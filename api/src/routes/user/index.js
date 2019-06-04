import login from 'connect-ensure-login';

const routes = {
  // Retorna dados do usuário logado
  'GET /user': {
    path: 'User.get',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },
};
