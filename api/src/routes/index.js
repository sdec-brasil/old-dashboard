const routes = {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */
  'GET /success': 'RestExample.test',
  'GET /login': 'Auth.loginTemp',
  'POST /login': 'Auth.login',
  'GET /error': 'Auth.error',
  'GET /logout': 'Auth.logout',
  'GET /account': 'Auth.account',

  'GET /auth/oauth2/authorize': 'OAuth2.authorization',
  'POST /auth/oauth2/authorize/decision': 'OAuth2.decision',
  'POST /auth/oauth2/token': 'OAuth2.token',

  'GET /api/userinfo': 'User.info',
  'GET /api/clientinfo': 'Client.info',

  'GET /auth/oauth2-example': 'OAuth2.example',
  'GET /auth/oauth2-example/callback': 'OAuth2.callback',
};

export default routes;
