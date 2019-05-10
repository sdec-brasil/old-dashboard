// Imports
import login from 'connect-ensure-login';
import oauth2orize from 'oauth2orize';
import passport from 'passport';

// App Imports
import { db } from '../utils/db';
import { tokens as config } from '../config/config';
import { crypto } from '../utils/crypto';
import validate from '../utils/validate';

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

// create OAuth 2.0 server
const server = oauth2orize.createServer();

// Configured expiresIn
const expiresIn = { expires_in: config.accesstoken.expiresIn };

/**
 * Grant authorization codes
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
server.grant(oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
  const code = crypto.createToken({ sub: user.id, exp: config.codeToken.expiresIn });
  db.authorizationCode.save(code, client.id, redirectURI, user.id, client.scope)
    .then(() => done(null, code))
    .catch(err => done(err));
}));

/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
server.grant(oauth2orize.grant.token((client, user, ares, done) => {
  const token = crypto.createToken({ sub: user.id, exp: config.accesstoken.expiresIn });
  const expiration = config.accesstoken.calculateExpirationDate();

  db.accessTokens.save(token, expiration, user.id, client.id, client.scope)
    .then(() => done(null, token, expiresIn))
    .catch(err => done(err));
}));

/**
 * Exchange authorization codes for access tokens.
 *
 * The callback accepts the `client`, which is exchanging `code` and any
 * `redirectURI` from the authorization request for verification.  If these values
 * are validated, the application issues an access token on behalf of the user who
 * authorized the code.
 */
server.exchange(oauth2orize.exchange.code((client, code, redirectURI, done) => {
  db.authorizationCode.delete(code)
    .then(authCode => validate.authCode(code, authCode, client, redirectURI))
    .then(authCode => validate.generateTokens(authCode))
    .then((tokens) => {
      if (tokens.length === 1) {
        return done(null, tokens[0], null, expiresIn);
      }
      if (tokens.length === 2) {
        return done(null, tokens[0], tokens[1], expiresIn);
      }
      throw new Error('Error exchanging auth code for tokens');
    })
    .catch(() => done(null, false));
}));

/**
 * Exchange user id and password for access tokens.
 *
 * The callback accepts the `client`, which is exchanging the user's name and password
 * from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the user who authorized the code.
 */
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  db.users.findByUsername(username)
    .then(user => validate.user(user, password))
    .then(user => validate.generateTokens({ scope, userID: user.id, clientID: client.id }))
    .then((tokens) => {
      if (tokens === false) {
        return done(null, false);
      }
      if (tokens.length === 1) {
        return done(null, tokens[0], null, expiresIn);
      }
      if (tokens.length === 2) {
        return done(null, tokens[0], tokens[1], expiresIn);
      }
      throw new Error('Error exchanging password for tokens');
    })
    .catch(() => done(null, false));
}));

/**
 * Exchange the client id and password/secret for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id and
 * password/secret from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the client who authorized the code.
 */
server.exchange(oauth2orize.exchange.clientCredentials((client, scope, done) => {
  const token = crypto.createToken({ sub: client.id, exp: config.accesstoken.expiresIn });
  const expiration = config.accesstoken.calculateExpirationDate();
  // Pass in a null for user id since there is no user when using this grant type
  db.accessTokens.save(token, expiration, null, client.id, scope)
    .then(() => done(null, token, null, expiresIn))
    .catch(err => done(err));
}));

/**
 * Exchange the refresh token for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client who authorized the code
 */
server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {
  db.refreshToken.findByToken(refreshToken)
    .then(foundRefreshToken => validate.refreshToken(foundRefreshToken, refreshToken, client))
    .then(foundRefreshToken => validate.generateToken(foundRefreshToken))
    .then(token => done(null, token, null, expiresIn))
    .catch(() => done(null, false));
}));

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTPS request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

server.serializeClient((client, done) => done(null, client.id));

server.deserializeClient((id, done) => {
  db.clients.findById(id)
    .then(client => done(null, client))
    .catch(err => done(err));
});

/*
  * User authorization endpoint
  *
  * `authorization` middleware accepts a `validate` callback which is
  * responsible for validating the client making the authorization request.  In
  * doing so, is recommended that the `redirectURI` be checked against a
  * registered value, although security requirements may vary accross
  * implementations.  Once validated, the `done` callback must be invoked with
  * a `client` instance, as well as the `redirectURI` to which the user will be
  * redirected after an authorization decision is obtained.
  *
  * This middleware simply initializes a new authorization transaction.  It is
  * the application's responsibility to authenticate the user and render a dialog
  * to obtain their approval (displaying details about the client requesting
  * authorization).  We accomplish that here by routing through `ensureLoggedIn()`
  * first, and rendering the `dialog` view.
  */
const authorization = [
  login.ensureLoggedIn(),
  server.authorization((clientID, redirectURI, scope, done) => {
    db.clients.findById(clientID)
      .then((client) => {
        console.log('1234');
        console.log(client);
        if (client) {
          client.scope = scope; // eslint-disable-line no-param-reassign
        }
        // WARNING: For security purposes, it is highly advisable to check that
        //          redirectURI provided by the client matches one registered with
        //          the server.  For simplicity, this example does not.  You have
        //          been warned.
        return done(null, client, redirectURI);
      })
      .catch(err => done(err));
  }), (req, res, next) => {
    // Render the decision dialog if the client isn't a trusted client
    // TODO:  Make a mechanism so that if this isn't a trusted client, the user can record that
    // they have consented but also make a mechanism so that if the user revokes access to any of
    // the clients then they will have to re-consent.
    db.clients.findById(req.query.client_id)
      .then((client) => {
        console.log('1634');
        console.log(client);
        if (client != null && client.trusted && client.trusted === 1) {
          console.log('entrou aqui');
          // This is how we short call the decision like the dialog below does
          server.decision({ loadTransaction: false }, (serverReq, callback) => {
            console.log('entrou aqui2');
            console.log(callback.toString());
            callback(null, { allow: true });
          })(req, res, next);
        } else {
          res.status(200).send(`transactionID: ${req.oauth2.transactionID}, user: ${req.user}, client: ${req.oauth2.client}`);
        }
      })
      .catch(() => res.status(555).send(`transactionID: ${req.oauth2.transactionID}, user: ${req.user}, client: ${req.oauth2.client}`));
  }];

/**
   * User decision endpoint
   *
   * `decision` middleware processes a user's decision to allow or deny access
   * requested by a client application.  Based on the grant type requested by the
   * client, the above grant middleware configured above will be invoked to send
   * a response.
   */
const decision = [
  login.ensureLoggedIn(),
  server.decision(),
];

/**
   * Token endpoint
   *
   * `token` middleware handles client requests to exchange authorization grants
   * for access tokens.  Based on the grant type being exchanged, the above
   * exchange middleware will be invoked to handle the request.  Clients must
   * authenticate when making requests to this endpoint.
   */
const token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler(),
];

export default {
  authorization,
  decision,
  token,
};
