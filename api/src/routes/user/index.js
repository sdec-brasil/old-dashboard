import login from 'connect-ensure-login';

export default {
  // Retorna informações do usuário logado
  'GET /user': {
    path: 'User.get',
    middlewares: [
      login.ensureLoggedIn(),
    ],
  },
  // Edita informações do usuário logado
  'PATCH /user': {
    path: 'User.patch',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },
};
