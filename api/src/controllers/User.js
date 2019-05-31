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
          console.log(typeof (this.model.rawAttributes[field].type.key));
          console.log(`field: ${field} - ${this.model.rawAttributes[field].type.key}`);
          console.log(`${this.model.rawAttributes[field].type}:`, Object.keys(this.model.rawAttributes[field].type));
          Object.keys(this.model.rawAttributes[field].type).forEach((key) => {
            console.log(`${key}:`, this.model.rawAttributes[field].type[key]);
          });

          // checking field type, to parse query string correctly:
          let filterValue = req.query[field];
          if (this.model.rawAttributes[field].type.key === 'BOOLEAN') {
            filterValue = (filterValue === 'true');
          } else if (this.model.rawAttributes[field].type.key === 'INTEGER') {
            filterValue = parseInt(filterValue, 10);
          }
          filters.where[field] = filterValue;
        }
      });
      // adding offset
      if (req.query.offset) {
        filters.offset = parseInt(req.query.offset, 10);
      }
      // adding limit
      if (req.query.limit) {
        filters.limit = parseInt(req.query.limit, 10);
      }
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
