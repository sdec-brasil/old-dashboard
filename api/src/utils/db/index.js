import jwt from 'jsonwebtoken';
import models from '../../models';

export const users = {
  /**
  * Returns a user if it finds one, otherwise returns null if a user is not found.
  * @param   {String}   username - The unique user name to find
  * @returns {Promise} resolved user if found, otherwise resolves undefined
  */

  findByUsername: username => Promise.resolve(models.user.findOne({
    raw: true,
    where: {
      username,
    },
  }) || undefined),

  /**
  * Returns a user if it finds one, otherwise returns null if a user is not found.
  * @param   {String}   id - The unique id of the user to find
  * @returns {Promise} resolved user if found, otherwise resolves undefined
  */

  findById: id => Promise.resolve(models.user.findOne({
    raw: true,
    where: {
      id,
    },
  }) || undefined),
};

export const clients = {
  /**
   * Returns a client if it finds one, otherwise returns null if a client is not found.
   * @param   {String}   id - The unique client id of the client to find
   * @returns {Promise} resolved promise with the client if found, otherwise undefined
   */

  findById: id => Promise.resolve(models.client.findOne({
    raw: true,
    where: {
      id,
    },
  }) || undefined),
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
      return Promise.resolve(models.accesstoken.findOne({
        raw: true,
        where: {
          token: decoded,
        },
      }));
    } catch (e) {
      return Promise.resolve(undefined);
    }
  },

  findByUserAndClient: (userId, clientId) => models.accesstoken.findOne({
    raw: true,
    where: {
      user_id: userId,
      client_id: clientId,
    },
  }),

  save: (token, userId, clientId) => models.accesstoken.create({
    token,
    user_id: userId,
    client_id: clientId,
  }),
};

export const authoCode = {
  findByCode: code => models.authorization_code.findOne({
    raw: true,
    where: {
      code,
    },
  }),

  save: (code, clientId, redirectUri, userId) => {
    console.log(code);
    return models.authorization_code.create({
      code,
      client_id: clientId,
      user_id: userId,
      redirectUris: redirectUri,
    });
  },
};

export const db = {
  users,
  clients,
  accessTokens,
  authoCode,
};
