// Imports
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';

// App Imports
import { sessions } from '../config/config';

// Load express modules
export default function (server) {
  console.info('SETUP - Loading modules...');

  // Enable CORS
  server.use(cors());

  // Request body parser
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  // Request body cookie parser
  server.use(cookieParser());

  // Use sessions as middleware
  server.use(session({
    saveUninitialized: true,
    resave: true,
    secret: sessions.secret,
    key: 'authorization.sid',
    cookie: { maxAge: sessions.maxAge },
  }));

  // Use Passport
  server.use(passport.initialize());
  server.use(passport.session());

  // HTTP logger
  server.use(morgan('tiny'));
}
