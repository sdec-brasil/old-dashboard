// Imports
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import setupPassport from './passport';
import sequelizeConnection from './databaseConnection';

// App Imports
import { accessTokens } from '../utils/db';
import { db, sessions } from '../config/config';

// Session Sequelize
const SessionStore = require('express-session-sequelize')(session.Store);

// Load express modules
export default function (server) {
  console.info('SETUP - Loading modules...');

  // Enable CORS
  server.use(cors());

  // Request body parser
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // Request body cookie parser
  server.use(cookieParser());

  // Use Sequelize to Store Sessions
  const sequelizeSessionStore = new SessionStore({
    db: sequelizeConnection,
  });

  // Use sessions as middleware
  server.use(session({
    saveUninitialized: true,
    resave: true,
    secret: sessions.secret,
    key: 'authorization.sid',
    cookie: { maxAge: sessions.maxAge },
    store: sequelizeSessionStore,
  }));

  // Use Passport
  server.use(passport.initialize());
  server.use(passport.session());

  // HTTP logger
  server.use(morgan('tiny'));

  // Catch all for error messages.  Instead of a stack
  // trace, this will log the json of the error message
  // to the browser and pass along the status with it
  server.use((err, req, res, next) => {
    if (err) {
      if (err.status == null) {
        console.error('Internal unexpected error from:', err.stack);
        res.status(500);
        res.json(err);
      } else {
        res.status(err.status);
        res.json(err);
      }
    } else {
      next();
    }
  });

  // From time to time we need to clean up any expired tokens
  // in the database
  setInterval(() => {
    accessTokens.removeExpired()
      .catch(err => console.error('Error trying to remove expired tokens:', err.stack));
  }, db.timeToCheckExpiredTokens * 1000);
}
