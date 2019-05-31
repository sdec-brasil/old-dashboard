// Imports
import passport from 'passport';
import models from '../models';

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

class ListView {
  constructor() {
    this.filterFields = [];
    this.model = null;
  }

  setFilters(filterFields) {
    if (Array.isArray(filterFields)) {
      this.filterFields = filterFields;
    }
  }

  setModel(model) {
    this.model = model;
  }

  query(req) {
    if (this.model) {
      const filters = {};
      filters.where = {};
      Object.keys(req.query).forEach((field) => {
        if ((this.model.rawAttributes[field] !== undefined)
        && this.filterFields.includes(field)) {
          console.log(`field: ${field} - ${this.model.rawAttributes[field].type}`);
          filters.where[field] = req.query[field];
        }
      });
      console.log('query object:', filters);
      // console.log(this.model.rawAttributes);
      return this.model.findAll(filters);
    }
    return null;
  }
}
const list = [
  // passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const userListView = new ListView();
    userListView.setFilters(['name', 'username']);
    userListView.setModel(models.user);
    userListView.query(req).then(results => res.json(results));
  },
];


export default {
  info,
  list,
};
