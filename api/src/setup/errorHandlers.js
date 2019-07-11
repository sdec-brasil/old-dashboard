import { errors } from '../utils';

/*
Here the error andlers will be registered.

Keep in mind that the order in which the handlers
appear here matter.

When registering a new handler,
you have to filter the error you want to treat
somehow (by the name, for example).

When you find your error, treat it, and if you send
a response to the user, you do not have to pass it along
to other error handlers down the chain.

If the error its not what your handler is looking for,
remember to pass it along with next(err).
This error will go through the error handlers chain
until its treated by a specific handler or until
it falls under the default error handler.
*/


export default function setupErrorHandler(server) {
  // handle sequelize unique constraint errors
  server.use((err, req, res, next) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const errorList = [];
      err.errors.forEach((error) => {
        errorList.push({
          name: err.name,
          type: error.type,
          message: error.message,
          value: error.value,
        });
      });
      console.error(err);
      res.send({ errors: errorList });
    } else {
      next(err);
    }
  });


  // handle sequelize database wrong field name errors
  server.use((err, req, res, next) => {
    if (err.parent && err.parent.sqlMessage) {
      console.error(err);
      const error = new errors.SequelizeDBError(err.parent.sqlMessage, err.stack);
      res.send(errors.toJson(error));
    } else {
      next(err);
    }
  });

  /*
   Default handlers for all errors. If you let an error
   arrive here, even if it was treated before, it will be treated
   again.
   */
  server.use((err, req, res, next) => {
    if (!err.status) {
      // Its not a custom error created by us
      console.error('Unexpected internal error:', err);
      res.status(500).send(errors.toJson(err));
    } else {
      // it is a custom error created by us
      console.error(err);
      res.status(err.status).send(errors.toJson(err));
    }
  });
}
