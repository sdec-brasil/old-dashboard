//
// The configuration options of the server
//

export const sessions = {
  secret: 'm3g4 s3cr3t',
  maxAge: 31449600000,
};

// export const oauth2 = {
//   oauth2ServerBaseUrl: 'https://localhost:8000',
//   authorizationUrl: '/dialog/authorize',
//   tokenUrl: '/oauth/token',
//   clientId: '289a320e-6ea8-11e9-a923-1681be663d3e',
//   clientSecret: 'ssh-secret',
//   callbackUrl: 'http://localhost:8000/auth/oauth2-example/callback',
// };

export const general = {
  graphqlEndpoint: '/graphql',
  port: 8000,
  graphql: {
    ide: true,
    pretty: true,
  },
};

export const tokens = {
  /**
   * calculateExpirationDate - A simple function to calculate the absolute time that the token is
   *                          going to expire in.
   */
  calculateExpirationDate(expiresIn) {
    return new Date(Date.now() + (expiresIn * 1000));
  },
  /**
   * Configuration of access tokens.
   *
   * expiresIn               - The time in minutes before the access token expires. Default is 60
   *                           minutes
   */
  accesstoken: {
    expiresIn: 60 * 60,
  },

  /**
   * Configuration of code token.
   * expiresIn - The time in minutes before the code token expires.  Default is 5 minutes.
   */
  codeToken: {
    expiresIn: 5 * 60,
  },

  /**
   * Configuration of refresh token.
   * expiresIn - The time in minutes before the code token expires.  Default is 100 years.  Most if
   *             all refresh tokens are expected to not expire.
   */
  refreshToken: {
    expiresIn: 52560000,
  },
};

/**
 * Database configuration for access and refresh tokens.
 *
 * timeToCheckExpiredTokens - The time in seconds to check the database for expired access tokens.
 *                            For example, if it's set to 3600, then that's one hour to check for
 *                            expired access tokens.
 */
export const db = {
  timeToCheckExpiredTokens: 3600,
};

export const limitSettings = {
  invoice: {
    get: 100,
  },
  city: {
    get: 100,
  },
};
