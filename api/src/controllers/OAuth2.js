// Imports
import passport from 'passport';
import login from 'connect-ensure-login';
import oauth2orize from 'oauth2orize';

// App Imports
import {
  users, clients, accessTokens, uid, authoCode,
} from '../utils';

// Create OAuth 2.0 server
const server = oauth2orize.createServer();

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated. To complete the transaction, the
// user must authenticate and approve the authorization request. Because this
// may involve multiple HTTP request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session. Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

server.serializeClient((client, done) => done(null, client.id));

server.deserializeClient((id, done) => clients.findById(id)
  .then(client => done(null, client))
  .catch(error => done(error)));

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources. It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

// Grant authorization codes. The callback takes the `client` requesting
// authorization, the `redirectUri` (which is used as a verifier in the
// subsequent exchange), the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application. The application issues a code, which is bound to these
// values, and will be exchanged for an access token.

server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
  const code = uid.generate(16);
  authoCode.save(code, client.id, redirectUri, user.id)
    .then(() => done(null, code))
    .catch(error => done(error));
}));

// Grant implicit authorization. The callback takes the `client` requesting
// authorization, the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application. The application issues a token, which is bound to these
// values.

server.grant(oauth2orize.grant.token((client, user, ares, done) => {
  const token = uid.generate(256);
  accessTokens.save(token, user.id, client.id)
    .then(() => done(null, token))
    .catch(error => done(error));
}));

// Exchange authorization codes for access tokens. The callback accepts the
// `client`, which is exchanging `code` and any `redirectUri` from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the user who authorized the
// code.

server.exchange(oauth2orize.exchange.code((client, code, redirectUri, done) => {
  authoCode.findByCode(code)
    .then((authCode) => {
      if (client.id !== authCode.client_id) {
        return done(null, false);
      }

      if (redirectUri !== authCode.redirectUris) {
        return done(null, false);
      }

      const token = uid.generate(256);

      return accessTokens.save(token, authCode.user_id, authCode.client_id)
        .then(() => done(null, token))
        .catch(error => done(error));
    })
    .catch(error => done(error));
}));

// Exchange user id and password for access tokens. The callback accepts the
// `client`, which is exchanging the user's name and password from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the user who authorized the code.

server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  // Validate the client
  clients.findById(client.id)
    .then((localClient) => {
      if (!localClient) {
        return done(null, false);
      }
      if (localClient.secret !== client.clientSecret) {
        return done(null, false);
      }
      // Validate the user
      return users.findByUsername(username)
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          if (password !== user.password) {
            return done(null, false);
          }
          // Everything validated, return the token
          const token = uid.generate(256);
          return accessTokens.save(token, user.id, client.id)
            .then(() => done(null, token))
            .catch(error => done(error));
        })
        .catch(error => done(error));
    })
    .catch(error => done(error));
}));

// Exchange the client id and password/secret for an access token. The callback accepts the
// `client`, which is exchanging the client's id and password/secret from the
// authorization request for verification. If these values are validated, the
// application issues an access token on behalf of the client who authorized the code.

server.exchange(oauth2orize.exchange.clientCredentials((client, scope, done) => {
  // Validate the client
  clients.findById(client.id)
    .then((localClient) => {
      if (!localClient) {
        return done(null, false);
      }
      if (localClient.secret !== client.clientSecret) {
        return done(null, false);
      }
      // Everything validated, return the token
      const token = uid.generate(256);
      // Pass in a null for user id since there is no user with this grant type
      return accessTokens.save(token, null, client.cliendId)
        .then(() => done(null, token))
        .catch(error => done(error));
    })
    .catch(error => done(error));
}));

const OAuth2 = () => {
  // User authorization endpoint.
  //
  // `authorization` middleware accepts a `validate` callback which is
  // responsible for validating the client making the authorization request. In
  // doing so, is recommended that the `redirectUri` be checked against a
  // registered value, although security requirements may vary accross
  // implementations. Once validated, the `done` callback must be invoked with
  // a `client` instance, as well as the `redirectUri` to which the user will be
  // redirected after an authorization decision is obtained.
  //
  // This middleware simply initializes a new authorization transaction. It is
  // the application's responsibility to authenticate the user and render a dialog
  // to obtain their approval (displaying details about the client requesting
  // authorization). We accomplish that here by routing through `ensureLoggedIn()`
  // first, and rendering the `dialog` view.
  const authorization = [
    login.ensureLoggedIn({ redirectTo: '../../login' }),
    server.authorization((clientId, redirectUri, done) => {
      // WARNING: For security purposes, it is highly advisable to check that
      //          redirectUri provided by the client matches one registered with
      //          the server. For simplicity, this example does not. You have
      //          been warned.
      clients.findById(clientId)
        .then(client => done(null, client, redirectUri))
        .catch(error => done(error));
    },
    (client, user, done) => {
      console.log(client);
      console.log(user);
      console.log(done);
      // Check if grant request qualifies for immediate approval
      if (client.trusted) {
        return done(null, true); // Auto-approve
      }

      return accessTokens.findByUserAndClient(user.id, client.id)
        .then((token) => {
        // Auto-approve
          if (!token) {
            return done(null, false);
          }
          // Otherwise ask user
          return done(null, true);
        })
        .catch((err) => {
          throw new Error('Not sure how to handle this?');
        });
    }),
    (req, res) => {
      res.send(`
      Hello, ${req.user.name}, 
      ${req.oauth2.client} is requesting access to your account
      Send a POST to v1/auth/oauth2/authorize/decision
      with transaction_id = ${req.oauth2.transactionID}
      `);
    },
  ];

  // User decision endpoint.
  //
  // `decision` middleware processes a user's decision to allow or deny access
  // requested by a client application. Based on the grant type requested by the
  // client, the above grant middleware configured above will be invoked to send
  // a response.
  const decision = [
    login.ensureLoggedIn({ redirectTo: 'v1/loginTemp' }),
    server.decision(),
  ];

  // Token endpoint.
  //
  // `token` middleware handles client requests to exchange authorization grants
  // for access tokens. Based on the grant type being exchanged, the above
  // exchange middleware will be invoked to handle the request. Clients must
  // authenticate when making requests to this endpoint.
  const token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler(),
  ];

  const example = passport.authenticate('oauth2-example');

  const callback = (req, res) => {
    console.log('aloa');
    res.redirect('success');
  };

  return {
    authorization,
    decision,
    token,
    example,
    callback,
  };
};

export default OAuth2;
