import login from 'connect-ensure-login';

const routes = {
  'POST /clients': 'Clients.post',

  'GET /client': {
    path: 'Clients.getMe',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },

  'PATCH /client': {
    path: 'Clients.patch',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },

  'DELETE /client': {
    path: 'Clients.delete',
    middlewares: [
      login.ensureLoggedIn,
    ],
  },
};
