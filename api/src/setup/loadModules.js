// Imports
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';

// App Imports
import { secret } from '../config/config.json';

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
    secret,
    resave: false,
    saveUninitialized: false,
  }));

  // Use Passport
  server.use(passport.initialize());
  server.use(passport.session());

  // HTTP logger
  server.use(morgan('tiny'));
}
