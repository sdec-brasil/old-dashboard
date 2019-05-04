// Imports
import passport from 'passport';
import Login from 'connect-ensure-login';

const Auth = () => {
  const error = (req, res) => res.status(401).send('Não conseguiu logar');

  const login = passport.authenticate('local', {
    successRedirect: 'success', failureRedirect: 'error',
  });

  const logout = (req, res) => {
    req.logout();
    res.redirect('success');
  };

  const loginTemp = (req, res) => {
    res.status(200).send('Dá um POST pra cá pra fazer login');
  };

  const account = [
    Login.ensureLoggedIn({ redirectTo: '/loginTemp' }),
    (req, res) => res.status(200).send(req.user),
  ];

  return {
    login,
    error,
    logout,
    account,
    loginTemp,
  };
};

export default Auth;
