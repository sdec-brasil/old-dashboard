import passport from 'passport';

export default {
  'POST /client': 'Clients.post',

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
    ],
  },

  'DELETE /client': {
    path: 'Clients.delete',
    middlewares: [
      passport.authenticate('bearer', { session: false }),
    ],
  },
};
