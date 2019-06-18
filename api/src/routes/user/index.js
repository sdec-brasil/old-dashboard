import login from 'connect-ensure-login';
import passport from 'passport';


export default {
  // Retorna informações do usuário logado
  'GET /user': {
    path: 'User.get',
    middlewares: [
      passport.authenticate('cookie', { session: false }),
      // passport.authenticate('bearer', { session: false }),
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
