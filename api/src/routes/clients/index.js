import passport from 'passport';
import validators from '../../services/clients/validators';

export default {
  'POST /client': {
    path: 'Clients.post',
    middlewares: [
      validators.createClient,
    ],
  },

  'GET /client': {
    path: 'Clients.getMe',
    middlewares: [
      passport.authenticate('bearer', { session: false }),
    ],
  },

  'PATCH /client': {
    path: 'Clients.patch',
    middlewares: [
      passport.authenticate('bearer', { session: false }),
      validators.editClient,
    ],
  },

  'DELETE /client': {
    path: 'Clients.delete',
    middlewares: [
      passport.authenticate('bearer', { session: false }),
    ],
  },
};
