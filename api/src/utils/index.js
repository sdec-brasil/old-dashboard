import models from '../models';
const jwt = require('jsonwebtoken');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const users = {
  findByUsername: username => models.user.findOne({
    raw: true,
    where: {
      username: username,
    },
  }),

  findById: id => models.user.findOne({
    raw: true,
    where: {
      id: id,
    },
  }),
};

export const clients = {
  findById: id => models.client.findOne({
    raw: true,
    where: {
      id: id,
    },
  }),
};

export const accessTokens = {
  /**
   * Returns an access token if it finds one, otherwise returns null if one is not found.
   * @param   {String}  token - The token to decode to get the id of the access token to find.
   * @returns {Promise} resolved with the token if found, otherwise resolved with null
   */
  findByToken: token => {
    try {
      // decode the token to get token id and returns it
      const id = jwt.decode(token).jti;
      return models.token.findOne({
        raw: true,
        where: {
          id: id,
        }
      });
    } catch (error) {
      return Promise.reject({ error: error, message: 'Could not decode jwt token.' });
    }
  },

  /**
   * Returns an access token based on the user and client, otherwise returns null if one is not found.
   * @param   {String}  userId - The id of the user to be used to find the token.
   * @param   {String}  clientId - The id of the client to be used to find the token.
   * @returns {Promise} resolved with the token if found, otherwise resolved with null
   */
  findByUserAndClient: (userId, clientId) => models.token.findOne({
    raw: true,
    where: {
      user_id: userId,
      client_id: clientId,
    },
  }),

  /**
   * Saves a access token, expiration date, user id, client id, and scope. Note: The actual full
   * access token is never saved.  Instead just the ID of the token is saved.  In case of a database
   * breach this prevents anyone from stealing the live tokens.
   * @param   {Object}  token          - The access token (required)
   * @param   {Date}    expirationDate - The expiration of the access token (required)
   * @param   {String}  userID         - The user ID (required)
   * @param   {String}  clientID       - The client ID (required)
   * @param   {String}  scope          - The scope (optional)
   * @returns {Promise} resolved with the saved token
   */
  save: (token, expirationDate, userID, clientID, scope) => {
    const id = jwt.decode(token).jti;
    return models.token.create({
      id: id,
      exp_date: expirationDate,
      user_id: userID,
      client_id: clientID,
      scope: scope
    });
  },

  /**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
  delete: (token) => {
    try {
      const id = jwt.decode(token).jti;
      return models.token.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      return Promise.reject({ error: error, message: 'Could not decode jwt token.' });
    }
  },

  /**
   * NOT IMPLEMENTED
   * Removes expired access tokens. It does this by looping through them all and then removing the
   * expired ones it finds.
   * @returns {Promise} resolved with an associative of tokens that were expired
   */
  removeExpired: () => {
    console.warn('Called utils.acessTokens.removeExpired(), which is not implemented');
    return Promise.resolve(true);
  },

  /**
   * NOT IMPLEMENTED
   * Removes all access tokens.
   * @returns {Promise} resolved with all removed tokens returned
   */
  removeAll: () => {
    console.warn('Called utils.acessTokens.removeExpired(), which is not implemented');
    return Promise.resolve(true);
  }
};

export const authoCode = {
  /**
 * Returns an authorization code if it finds one, otherwise returns null if one is not found.
 * @param   {String}  token - The token to decode to get the id of the authorization token to find.
 * @returns {Promise} resolved with the authorization code if found, otherwise undefined
 */
  findByToken: token => {
    try {
      const id = jwt.decode(token).jti;
      return models.authorization_code.findOne({
        raw: true,
        where: {
          id: id,
        }
      });
    } catch (error) {
      return Promise.resolve({ error: error, message: 'Could not decode jwt token.' });
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
   * @returns {Promise} resolved with the saved token
   */
  save: (code, clientID, redirectURI, userID, scope) => {
    const id = jwt.decode(code).jti;
    return models.authorization_code.create({
      id: id,
      client_id: clientID,
      user_id: userID,
      redirectUris: redirectURI,
      scope: scope
    });
  }
};

export const uid = {
  generate: (length) => {
    let token = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;

    for (let i = 0; i < length; ++i) {
      token += chars[getRandomInt(0, charsLength - 1)];
    }

    return token;
  },
};
