import jwt from 'jsonwebtoken';
import models from '../../models';

export const users = {
  /**
  * Returns a user if it finds one, otherwise returns null if a user is not found.
  * @param   {String}   username - The unique user name to find
  * @returns {Promise} resolved user if found, otherwise resolves null
  */

  findByUsername: username => models.user.findOne({
    raw: true,
    where: {
      username,
    },
  }),

  /**
  * Returns a user if it finds one, otherwise returns null if a user is not found.
  * @param   {String}   id - The unique id of the user to find
  * @returns {Promise} resolved user if found, otherwise resolves null
  */

  findById: id => models.user.findOne({
    raw: true,
    where: {
      id,
    },
  }),
};

export const clients = {
  /**
   * Returns a client if it finds one, otherwise returns null if a client is not found.
   * @param   {String}   id - The unique client id of the client to find
   * @returns {Promise} resolved promise with the client if found, otherwise null
   */

  findById: id => models.client.findOne({
    raw: true,
    where: {
      id,
    },
  }),
};

export const accessTokens = {
  /**
   * Returns an access token if it finds one, otherwise returns null if one is not found.
   * @param   {String}  token - The token to decode to get the id of the access token to find.
   * @returns {Promise} resolved with the token if found, otherwise resolved with undefined
   */
  findByToken: (token) => {
    try {
      const decoded = jwt.decode(token).jti;
      return models.access_token.findOne({
        raw: true,
        where: {
          id: decoded,
        },
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  },

  /**
   * Saves a access token, expiration date, user id, client id, and scope. Note: The actual full
   * access token is never saved.  Instead just the ID of the token is saved.  In case of a database
   * breach this prevents anyone from stealing the live tokens.
   * @param   {Object}  token          - The access token (required)
   * @param   {Date}    exp_date - The expiration of the access token (required)
   * @param   {String}  user_id         - The user ID (required)
   * @param   {String}  client_id       - The client ID (required)
   * @param   {String}  scope          - The scope (optional)
   * @returns {Promise} resolved with the saved token //TODO: What if it fails?
   */

  save: (token, exp_date, user_id, client_id, scope) => models.access_token.create({
    id: token,
    exp_date,
    user_id,
    client_id,
    scope,
  }),


  /**
   * Deletes/Revokes an access token by getting the ID and removing it from the storage.
   * @param   {String}  token - The token to decode to get the id of the access token to delete.
   * @returns {Promise} resolved with the deleted token, or null if it fails
   */
  delete: (token) => {
    try {
      const id = jwt.decode(token).jti;
      return Promise.resolve(models.access_token.findOne({
        where: {
          id,
        },
      }).then((obj) => {
        obj.destroy()
          .then(() => obj);
      }));
    } catch (error) {
      return Promise.resolve(null);
    }
  },
  /**
  * Removes expired access tokens.
  * @returns {Promise} resolved with the # of tokens that were expired
  */
  removeExpired: () => {
    const now = Date.now();
    models.access_token.findAll({
      where: {
        exp_date: {
          [models.Sequelize.Op.lt]: now,
        },
      },
    });
  },
};

export const authorizationCode = {
  /**
   * Returns an authorization code if it finds one, otherwise returns null if one is not found.
   * @param   {String}  token - The token to decode to get the id of the authorization token to find.
   * @returns {Promise} resolved with the authorization code if found, otherwise null
   */
  findByToken: (token) => {
    try {
      const id = jwt.decode(token).jti;
      return Promise.resolve(models.authorization_code.findOne({
        where: {
          id,
        },
      }));
    } catch (error) {
      return Promise.resolve(null);
    }
  },

  /**
   * Saves a authorization code, client id, redirect uri, user id, and scope. Note: The actual full
   * authorization token is never saved.  Instead just the ID of the token is saved.  In case of a
   * database breach this prevents anyone from stealing the live tokens.
   * @param   {String}  code        - The authorization code (required)
   * @param   {String}  clientID    - The client ID (required)
   * @param   {String}  redirectURI - The redirect URI of where to send access tokens once exchanged
   * @param   {String}  userID      - The user ID (required)
   * @param   {String}  scope       - The scope (optional)
   * @returns {Promise} resolved with the saved token //TODO: What if it fails?
   */
  save: (code, client_id, redirect_uri, user_id, scope) => {
    const id = jwt.decode(code).jti;
    return Promise.resolve(models.authorization_code.crete({
      id,
      client_id,
      redirect_uri,
      user_id,
      scope,
    }));
  },

  /**
   * Deletes an authorization code
   * @param   {String}  token - The authorization code to delete
   * @returns {Promise} resolved with the deleted value, or null, we think
   */
  delete: (token) => {
    try {
      const id = jwt.decode(token).jti;
      return Promise.resolve(models.authorization_code.findOne({
        where: {
          id,
        },
      }).then((obj) => {
        obj.destroy()
          .then(() => obj);
      }));
    } catch (error) {
      return Promise.resolve(null);
    }
  },

};

export const refreshToken = {
  /**
   * Returns a refresh token if it finds one, otherwise returns null if one is not found.
   * @param   {String}  token - The token to decode to get the id of the refresh token to find.
   * @returns {Promise} resolved with the token, or null
   */
  findByToken: (token) => {
    try {
      const decoded = jwt.decode(token).jti;
      return models.refresh_token.findOne({
        raw: true,
        where: {
          id: decoded,
        },
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  },

  /**
   * Saves a refresh token, user id, client id, and scope. Note: The actual full refresh token is
   * never saved.  Instead just the ID of the token is saved.  In case of a database breach this
   * prevents anyone from stealing the live tokens.
   * @param   {Object}  token    - The refresh token (required)
   * @param   {String}  userID   - The user ID (required)
   * @param   {String}  clientID - The client ID (required)
   * @param   {String}  scope    - The scope (optional)
   * @returns {Promise} resolved with the saved token //TODO: What if it fails?
   */

  save: (token, user_id, client_id, scope) => {
    const id = jwt.decode(token).jti;
    models.refresh_token.create({
      id,
      user_id,
      client_id,
      scope,
    });
  },


  /**
   * Deletes a refresh token
   * @param   {String}  token - The token to decode to get the id of the refresh token to delete.
   * @returns {Promise} resolved with the deleted token
   */
  delete: (token) => {
    try {
      const id = jwt.decode(token).jti;
      return Promise.resolve(models.refresh_token.findOne({
        where: {
          id,
        },
      }).then((obj) => {
        obj.destroy()
          .then(() => obj);
      }));
    } catch (error) {
      return Promise.resolve(null);
    }
  },
};

export const db = {
  users,
  clients,
  accessTokens,
  authorizationCode,
  refreshToken,
};
