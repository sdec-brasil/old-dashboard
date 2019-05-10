// Imports
import passport from 'passport';
import Login from 'connect-ensure-login';

const error = (req, res) => res.status(401).send('Não conseguiu logar');

/**
  * Authenticate normal login page using strategy of authenticate
  */
const login = [
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/error',
  }),
];

/**
   * Logout of the system and redirect to root
   * @param   {Object}   req - The request
   * @param   {Object}   res - The response
   * @returns {undefined}
   */
const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

const loginTemp = (req, res) => {
  res.status(200).send('Dá um POST pra cá pra fazer login');
};

const account = [
  Login.ensureLoggedIn({ redirectTo: '/' }),
  (req, res) => res.status(200).send(req.user),
];

export default {
  error,
  login,
  logout,
  loginTemp,
  account,
};
