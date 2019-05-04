// Imports
import passport from 'passport';

const User = () => {
  const info = [
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
      // request.authInfo is set using the `info` argument supplied by
      // `BearerStrategy`. It is typically used to indicate scope of the token,
      // and used in access control checks. For illustrative purposes, this
      // example simply returns the scope in the response.
      res.json({ user_id: req.user.id, name: req.user.name, scope: req.authInfo.scope });
    },
  ];

  return {
    info,
  };
};

export default User;
