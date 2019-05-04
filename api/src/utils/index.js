import models from '../models';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const users = {

  findByUsername: username => models.user.find({
    where: {
      username,
    },
  }),

  findById: id => models.user.find({
    where: {
      id,
    },
  }),
};

export const clients = {
  findById: id => models.client.find({
    where: {
      id,
    },
  }),
};

export const accessTokens = {
  findByToken: token => models.token.find({
    where: {
      id: token,
    },
  }),

  findByUserAndClient: (userId, clientId) => models.token.find({
    where: {
      user_id: userId,
      client_id: clientId,
    },
  }),

  save: (token, userId, clientId) => models.token.create({
    token,
    user_id: userId,
    client_id: clientId,
  }),
};

export const authoCode = {
  findByCode: code => models.authorization_code.find({
    where: {
      code,
    },
  }),

  save: (code, clientId, redirectUri, userId) => {
    models.authorization_code.create({
      code,
      client_id: clientId,
      user_id: userId,
      redirectUris: redirectUri,
    });
  },
};

export const uid = {
  generate: (length) => {
    let token = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;

    for (let i = 0; i < length; ++i) {
      token += chars[getRandomInt(0, charsLength - 1)];
    }

    return uid;
  },
};
