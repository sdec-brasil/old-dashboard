// Imports
import passport from 'passport';
import models from '../../models';
import userService from '../../services/users';

/**
   * Simple informational end point, if you want to get information
   * about a particular user.  You would call this with an access token
   * in the body of the message according to OAuth 2.0 standards
   * http://tools.ietf.org/html/rfc6750#section-2.1
   *
   * Example would be using the endpoint of
   * https://localhost:3000/api/userinfo
   *
   * With a GET using an Authorization Bearer token similar to
   * GET /api/userinfo
   * Host: https://localhost:3000
   * Authorization: Bearer someAccessTokenHere
   * @param {Object} req The request
   * @param {Object} res The response
   * @returns {undefined}
   */
const info = [
  passport.authenticate('bearer', { session: false }),
  // req.authInfo is set using the `info` argument supplied by
  // `BearerStrategy`.  It is typically used to indicate scope of the token,
  // and used in access control checks.  For illustrative purposes, this
  // example simply returns the scope in the response.
  async (req, res) => {
    const response = await userService.getUserInfo(req);
    res.status(response.code).send(response.data);
  },
];

export default {
  info,
};
