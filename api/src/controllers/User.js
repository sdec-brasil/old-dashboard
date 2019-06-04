// Imports
import passport from 'passport';
import models from '../models';
import ListView from '../utils/listFilters';

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
  (req, res) => {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    res.json({ user_id: req.user.id, name: req.user.name, scope: req.authInfo.scope });
  },
];

const list = [
  // passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const userListView = new ListView();
    userListView.setFilterFields(['name', 'username', 'createdAt', 'estado2__sigla', 'estado1__sigla',
      'estado2__sigla_to', 'estado1__sigla_from']);
    userListView.setModel(models.user);
    userListView.buildQuery(req);
    console.log(userListView.getFilters());
    userListView.executeQuery().then(results => res.json(results));

    // models.user.findAll(
    //   {
    //     include: [{
    //       model: models.estado,
    //       as: 'estado2',
    //       where: {
    //         sigla: 'BA',
    //       },
    //     },
    //     {
    //       model: models.estado,
    //       as: 'estado1',
    //     }],
    //   },
    // ).then((users) => {
    //   res.json(users);
    // });
  },
];


export default {
  info,
  list,
};
