// Imports
import process from 'process';

// App Imports
import { tokens } from '../../config/config';
import { db } from '../db';
import { crypto } from '../crypto';

/** Validate object to attach all functions to  */
const validate = Object.create(null);

/** Suppress tracing for things like unit testing */
const suppressTrace = process.env.OAUTHRECIPES_SURPRESS_TRACE === 'true';

/**
 * Log the message and throw it as an Error
 * @param   {String} msg - Message to log and throw
 * @throws  {Error}  The given message as an error
 * @returns {undefined}
 */
validate.logAndThrow = (msg) => {
  if (!suppressTrace) {
    console.error(`!! Error !! ${msg}`);
    console.trace(msg);
  }
  throw new Error(msg);
};

/**
 * Given a user and a password this will return the user if it exists and the password matches,
 * otherwise this will throw an error
 * @param   {Object} user     - The user profile
 * @param   {String} password - The user's password
 * @throws  {Error}  If the user does not exist or the password does not match
 * @returns {Object} The user if valid
 */
validate.user = (user, password) => {
  validate.userExists(user);
  if (user.password !== password) {
    validate.logAndThrow('User password does not match');
  }
  return user;
};

/**
 * Given a user this will return the user if it exists otherwise this will throw an error
 * @param   {Object} user - The user profile
 * @throws  {Error}  If the user does not exist or the password does not match
 * @returns {Object} The user if valid
 */
validate.userExists = (user) => {
  if (user == null) {
    validate.logAndThrow('User does not exist');
  }
  return user;
};

/**
 * Given a client and a client secret this return the client if it exists and its clientSecret
 * matches, otherwise this will throw an error
 * @param   {Object} client       - The client profile
 * @param   {String} clientSecret - The client's secret
 * @throws  {Error}  If the client or the client secret does not match
 * @returns {Object} The client if valid
 */
validate.client = (client, supposedSecret) => {
  validate.clientExists(client);
  if (client.secret !== supposedSecret) {
    validate.logAndThrow('Client secret does not match');
  }
  return client;
};

/**
 * Given a client this will return the client if it exists , otherwise this will throw an error
 * @param   {Object} client - The client profile
 * @throws  {Error}  If the client does not exist
 * @returns {Object} The client if valid
 */
validate.clientExists = (client) => {
  if (client == null) {
    validate.logAndThrow('Client does not exist');
  }
  return client;
};

/**
 * Given a token and accessToken this will return either the user or the client associated with
 * the token if valid.  Otherwise this will throw.
 * @param   {Object}  token       - The token
 * @param   {Object}  accessToken - The access token
 * @throws  {Error}   If the token is not valid
 * @returns {Promise} Resolved with the user or client associated with the token if valid
 */
validate.token = (token, accessToken) => {
  crypto.verifyToken(accessToken);

  // token is a user token
  if (token.user_id != null) {
    return db.users.findById(token.user_id)
      .then(user => validate.userExists(user))
      .then(user => user);
  }
  // token is a client token
  return db.clients.findById(token.client_id)
    .then(client => validate.clientExists(client))
    .then(client => client);
};

/**
 * Given a refresh token and client this will return the refresh token if it exists and the client
 * id's match otherwise this will throw an error
 * throw an error
 * @param   {Object} token        - The token record from the DB
 * @param   {Object} refreshToken - The raw refresh token
 * @param   {Object} client       - The client profile
 * @throws  {Error}  If the refresh token does not exist or the client id's don't match
 * @returns {Object} The refresh token if valid
 */
validate.refreshToken = (token, refreshToken, client) => {
  crypto.verifyToken(refreshToken);
  if (client.id !== token.client_id) {
    validate.logAndThrow('RefreshToken clientID does not match client id given');
  }
  return token;
};

/**
 * Given a auth code, client, and redirectURI this will return the auth code if it exists and is
 * not 0, the client id matches it, and the redirectURI matches it, otherwise this will throw an
 * error.
 * @param  {Object}  code        - The auth code record from the DB
 * @param  {Object}  authCode    - The raw auth code
 * @param  {Object}  client      - The client profile
 * @param  {Object}  redirectURI - The redirectURI to check against
 * @throws {Error}   If the auth code does not exist or is zero or does not match the client or
 *                   the redirectURI
 * @returns {Object} The auth code token if valid
 */
validate.authCode = (code, authCode, client, redirectURI) => {
  crypto.verifyToken(code);
  if (client.id !== authCode.client_id) {
    validate.logAndThrow('AuthCode clientID does not match client id given');
  }
  if (redirectURI !== authCode.redirect_uri) {
    validate.logAndThrow('AuthCode redirectURI does not match redirectURI given');
  }

  return authCode;
};

/**
 * I mimic openid connect's offline scope to determine if we send a refresh token or not
 * @param   {Array}   scope - The scope to check if is a refresh token if it has 'offline_access'
 * @returns {Boolean} true If the scope is offline_access, otherwise false
 */
validate.isRefreshToken = ({ scope }) => scope != null && scope.indexOf('offline_access') === 0;

/**
 * Given a userId, clientID, and scope this will generate a refresh token, save it, and return it
 * @param   {Object}  user_id   - The user profile
 * @throws  {Object}  client_id - the client profile
 * @throws  {Object}  scope    - the scope
 * @returns {Promise} The resolved refresh token after saved
 */
validate.generateRefreshToken = ({ user_id, client_id, scope }) => {
  const refreshToken = crypto.createToken({ sub: user_id, exp: tokens.refreshToken.expiresIn });
  return db.refreshTokens.save(refreshToken, user_id, client_id, scope)
    .then(() => refreshToken);
};

/**
 * Given an auth code this will generate a access token, save that token and then return it.
 * @param   {user_id}   user_id   - The user profile
 * @param   {client_id} client_id - The client profile
 * @param   {scope}    scope    - The scope
 * @returns {Promise}  The resolved refresh token after saved
 */
validate.generateToken = ({ user_id, client_id, scope }) => {
  const token = crypto.createToken({ sub: user_id, exp: tokens.accesstoken.expiresIn });
  const expiration = tokens.accesstoken.calculateExpirationDate();

  return db.accessTokens.save(token, expiration, user_id, client_id, scope)
    .then(() => token);
};

/**
 * Given an auth code this will generate a access and refresh token, save both of those and return
 * them if the auth code indicates to return both.  Otherwise only an access token will be returned.
 * @param   {Object}  authCode - The auth code
 * @throws  {Error}   If the auth code does not exist or is zero
 * @returns {Promise} The resolved refresh and access tokens as an array
 */
validate.generateTokens = (authCode) => {
  if (validate.isRefreshToken(authCode)) {
    return Promise.all([
      validate.generateToken(authCode),
      validate.generateRefreshToken(authCode),
    ]);
  }
  return Promise.all([validate.generateToken(authCode)]);
};

/**
 * Given a token this will resolve a promise with the token if it is not null and the expiration
 * date has not been exceeded.  Otherwise this will throw a HTTP error.
 * @param   {Object}  token - The token to check
 * @returns {Promise} Resolved with the token if it is a valid token otherwise rejected with error
 */
validate.tokenForHttp = token => new Promise((resolve, reject) => {
  try {
    crypto.verifyToken(token);
  } catch (err) {
    const error = new Error('invalid_token');
    error.status = 400;
    reject(error);
  }
  resolve(token);
});

/**
 * Given a token this will return the token if it is not null. Otherwise this will throw a
 * HTTP error.
 * @param   {Object} token - The token to check
 * @throws  {Error}  If the client is null
 * @returns {Object} The client if it is a valid client
 */
validate.tokenExistsForHttp = (token) => {
  if (token == null) {
    const error = new Error('invalid_token');
    error.status = 400;
    throw error;
  }
  return token;
};


/**
 * Given a client this will return the client if it is not null. Otherwise this will throw a
 * HTTP error.
 * @param   {Object} client - The client to check
 * @throws  {Error}  If the client is null
 * @returns {Object} The client if it is a valid client
 */
validate.clientExistsForHttp = (client) => {
  if (client == null) {
    const error = new Error('invalid_token');
    error.status = 400;
    throw error;
  }
  return client;
};

/**
 * Verifies if a given string is a valid CPF
 * @param   {String} cpf - Supposedly CPF
 * @returns {Boolean} True if valid CPF
 */
validate.CPF = (cpf) => {
  // Check CPF format
  if (/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/.test(cpf)) {
    return false;
  }

  // Checking if all digits are equal
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  const cleanCPF = cpf.replace(/\.|-|\s/g, '');
  const firstNineDigits = cleanCPF.substring(0, 9);
  const checker = cleanCPF.substring(9, 11);

  if (cleanCPF.length !== 11) {
    return false;
  }

  let sum = 0;

  for (let j = 0; j < 9; ++j) {
    sum += Number(firstNineDigits.charAt(j)) * (10 - j);
  }

  const checker1 = sum % 11 < 2 ? 0 : 11 - sum % 11;

  const cpfWithChecker1 = firstNineDigits + String(checker1);

  sum = 0;

  for (let k = 0; k < 10; ++k) {
    sum += Number(cpfWithChecker1.charAt(k)) * (11 - k);
  }

  const checker2 = sum % 11 < 2 ? 0 : 11 - sum % 11;

  return checker.toString() === checker1.toString() + checker2.toString();
};

/**
 * Verifies if a given string is a valid CNPJ
 * @param   {String} _cnpj - Supposedly CNPJ
 * @returns {Boolean} True if valid CNPJ
 */
validate.CNPJ = (_cnpj) => {
  // Check _CNPJ Format
  if (/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/.test(_cnpj)) {
    return false;
  }
  const cnpj = _cnpj.replace(/[^\d]+/g, '');

  // Checking if all digits are equal
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const t = cnpj.length - 2;
  const d = cnpj.substring(t);
  const d1 = Number(d.charAt(0));
  const d2 = Number(d.charAt(1));

  const calc = (x) => {
    const n = cnpj.substring(0, x);
    let y = x - 7;
    let s = 0;
    let r = 0;

    for (let i = x; i >= 1; i--) {
      s += n.charAt(x - i) * y--;
      if (y < 2) { y = 9; }
    }

    r = 11 - s % 11;
    return r > 9 ? 0 : r;
  };

  return calc(t) === d1 && calc(t + 1) === d2;
};

/**
 * Verifies if a given string is a valid address on our blockchain
 * @param   {String} _cnpj - Supposedly Address
 * @returns {Boolean} True if valid Address
 */
validate.Address = (address) => {
  const re = /^[13n][1-9A-Za-z][^OIl]{20,40}/;
  if (!re.test(address)) {
    return false;
  }
  return true;
};

/**
 * Verifies if a given string is a valid GUID
 * @param   {String} guid - Supposedly GUID
 * @returns {Boolean} True if valid GUID
 */
validate.GUID = (guid) => {
  const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!re.test(guid)) {
    return false;
  }
  return true;
};

export default validate;
