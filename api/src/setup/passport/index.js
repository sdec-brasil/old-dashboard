// Imports
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { BasicStrategy } from 'passport-http';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

// App Imports
import { users, clients, accessTokens } from '../../utils';

export default function () {
  /**
   * LocalStrategy
   *
   * This strategy is used to authenticate users based on a username and password.
   * Anytime a request is made to authorize an application, we must ensure that
   * a user is logged in before asking them to approve the request.
   */
  passport.use(new LocalStrategy(
    (username, password, done) => {
      users.findByUsername(username).then((user) => {
        if (!user) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      }).catch(error => done(error));
    },
  ));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    users.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error));
  });

  /**
   * BasicStrategy & ClientPasswordStrategy
   *
   * These strategies are used to authenticate registered OAuth clients. They are
   * employed to protect the `token` endpoint, which consumers use to obtain
   * access tokens. The OAuth 2.0 specification suggests that clients use the
   * HTTP Basic scheme to authenticate. Use of the client password strategy
   * allows clients to send the same credentials in the request body (as opposed
   * to the `Authorization` header). While this approach is not recommended by
   * the specification, in practice it is quite common.
   */
  function verifyClient(clientId, clientSecret, done) {
    clients.findById(clientId)
      .then((client) => {
        if (!client) {
          return done(null, false);
        }
        if (client.secret !== clientSecret) {
          return done(null, false);
        }
        return done(null, client);
      }).catch(error => done(error));
  }

  passport.use(new BasicStrategy(verifyClient));

  passport.use(new ClientPasswordStrategy(verifyClient));

  /**
   * BearerStrategy
   *
   * This strategy is used to authenticate either users or clients based on an access token
   * (aka a bearer token). If a user, they must have previously authorized a client
   * application, which is issued an access token to make requests on behalf of
   * the authorizing user.
   */
  passport.use(new BearerStrategy(
    (accessToken, done) => {
      accessTokens.findByToken(accessToken)
        .then((token) => {
          if (!token) {
            return done(null, false);
          }
          if (token.user_id) {
            users.findByClientId(token.user_id)
              .then((user) => {
                if (!user) {
                  return done(null, false);
                }
                // To keep this code simple, restricted scopes are not implemented,
                // and this is just for illustrative purposes.
                return done(null, user, { scope: '*' });
              })
              .catch(error => done(error));
          } else {
            // The request came from a client only since userId is null,
            // therefore the client is passed back instead of a user.
            clients.findById(token.client_id)
              .then((client) => {
                if (!client) {
                  return done(null, false);
                }
                // To keep this example simple, restricted scopes are not implemented,
                // and this is just for illustrative purposes.
                return done(null, client, { scope: '*' });
              })
              .catch(error => done(error));
          }
        }).catch(error => done(error));
    },
  ));
}
